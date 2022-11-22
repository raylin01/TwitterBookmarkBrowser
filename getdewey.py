import requests
import time
import calendar
from pathlib import Path
import mimetypes
import json
# Variables to change
# -------------------
# Path to folder to output the files (relative or absolute both work)
path = "data/"
# Number of pages to download (first N), 0 for all
pages = 0
# start page
start_page = 1
# Download media files (images, videos, etc.)?
media = True
# Folder ID
folder_id = "YOUR FOLDER ID"
# Authorization token
token = "YOUR TOKEN HERE"
# Redownload files already downloaded?
redownload = False
# Verbose output?
verbose = True
# -------------------

api_url = "https://getdewey.co/tweets/?folder_id="+ folder_id +"&sort_direction=-&sort_field=sort_order&page_number="

def save_image(url, filename):
    response = requests.get(url)
    if response.status_code != 200:
        print("Error: " + str(response.status_code))
        return None
    # make sure the path exists
    myfile = Path("public/"+filename)
    myfile.touch(exist_ok=True)
    with open(myfile, 'wb') as f:
        f.write(response.content)
    
    return filename

def save_video(url, filename):
    response = requests.get(url)
    if response.status_code != 200:
        print("Error: " + str(response.status_code))
        return None
    # make sure the path exists
    myfile = Path("public/"+filename)
    myfile.touch(exist_ok=True)
    with open(myfile, 'wb') as f:
        f.write(response.content)

    return filename

def get_data(page):
    url = api_url + str(page)
    payload={}
    headers = {
        'Authorization': token
    }
    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code != 200:
        print("Error: " + str(response.status_code))
        return None

    return response.json()


if __name__ == '__main__':
    print("Starting download...")
    # create folder if it doesn't exist
    Path("src/" + path).mkdir(parents=True, exist_ok=True)
    temppath = "public/" + path
    Path(temppath).mkdir(parents=True, exist_ok=True)
    temppath = "public/" + path + "profiles"
    Path(temppath).mkdir(parents=True, exist_ok=True)
    temppath = "public/" + path + "media"
    Path(temppath).mkdir(parents=True, exist_ok=True)

    page = start_page
    while True:
        data = get_data(page)
        if data is None:
            break
        if len(data) == 0:
            break
        for tweet in data["tweets"]:
            # if the tweet is already downloaded, skip
            if not redownload:
                timestring = calendar.timegm(time.strptime(str(tweet["tweet_date"]), "%I:%M %p, %b %d, %Y"))
                filename = path + str(timestring) + "-" + tweet["tweet_id"] + ".json"
                if Path(filename).is_file():
                    if verbose:
                        print("Skipping " + filename)
                    continue
            # save media files
            count = 0
            if media:
                # save profile image
                filename = path + "profiles/" + str(tweet["tweet_id"]) + "_" + str(count) + mimetypes.guess_extension(mimetypes.guess_type(tweet["posted_by_profile_pic"])[0])
                count += 1
                imgpath = save_image(tweet["posted_by_profile_pic"], filename)
                tweet["posted_by_profile_pic"] = imgpath
                # save tweet images
                if tweet["tweet_media"] is not None and len(tweet["tweet_media"]) > 0:
                    for i in range(len(tweet["tweet_media"])):
                        if tweet["tweet_media"][i]["type"] == "photo":
                            filename = path + "media/" + str(tweet["tweet_id"]) + "_" + str(count) + mimetypes.guess_extension(mimetypes.guess_type(tweet["tweet_media"][i]["link"])[0])
                            count += 1
                            imgpath = save_image(tweet["tweet_media"][i]["link"], filename)
                            tweet["tweet_media"][i]["link"] = imgpath
                        elif tweet["tweet_media"][i]["type"] == "video":
                            filename = path + "media/" + str(tweet["tweet_id"]) + "_" + str(count) + mimetypes.guess_extension(mimetypes.guess_type(tweet["tweet_media"][i]["link"])[0])
                            count += 1
                            imgpath = save_image(tweet["tweet_media"][i]["link"], filename)
                            tweet["tweet_media"][i]["link"] = imgpath
                            for j in range(len(tweet["tweet_media"][i]["video_src"])):
                                if tweet["tweet_media"][i]["video_src"][j]["content_type"] is not None and tweet["tweet_media"][i]["video_src"][j]["content_type"].startswith("video"):
                                    filename = path + "media/" + str(tweet["tweet_id"]) + "_" + str(count) + mimetypes.guess_extension(tweet["tweet_media"][i]["video_src"][j]["content_type"])
                                    count += 1
                                    videopath = save_video(tweet["tweet_media"][i]["video_src"][j]["url"], filename)
                                    tweet["tweet_media"][i]["video_src"][j]["url"] = videopath

            # save tweet as json to file
            timestring = calendar.timegm(time.strptime(str(tweet["tweet_date"]), "%I:%M %p, %b %d, %Y"))
            filename = "src/" + path + str(timestring) + "-" + tweet["tweet_id"] + ".json"
            myfile = Path(filename)
            myfile.touch(exist_ok=True)
            with open(myfile, "w") as f:
                f.write(json.dumps(tweet))
            if verbose:
                print("Saved tweet " + str(tweet["tweet_id"]))

        print ("Downloaded page " + str(page) + " of " + str(data["total_pages"]))
        
        if page >= pages and pages != 0:
            break

        if page == int(data["total_pages"]):
            break
        page += 1

    print("Finished download")