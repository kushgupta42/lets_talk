import json
import os
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import JSONFormatter

json_formatter = JSONFormatter()


def get_subtitle(video_id):
    try:
        subs = []
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        for transcript in transcript_list:
            transcript_language = transcript.language_code
            print(f"actual transcript language: {transcript_language}")
            is_translatable = transcript.is_translatable
            print(f" is trnascript translatable: {is_translatable}")

            if "en" not in transcript_language and not is_translatable:
                raise Exception("cannot get en transcript")
            else:
                transcript = transcript.translate("en")
            # fetch the actual transcript data
            subs = transcript.fetch()
            # translated_transcript = transcript.translate("de")
            # print("\n\n translating transcript in de\n\n")
            # print(translated_transcript.fetch())
            # translated_transcript = transcript.translate("en")
            # print("\n\n translating transcript in en\n\n")
            # print(translated_transcript.fetch())
        formatted_subs = json_formatter.format_transcript(transcript=subs)
        return formatted_subs
    except Exception as error:
        print(error)
        print("transcript not availa")
        raise Exception("cannot get en transcript")


def write_subs_to_json(json_formatted_subs: json, folder_path: str, video_id: str):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    with open(f"{folder_path}/{video_id}.json", mode="w", encoding="utf-8") as f:
        f.write(json_formatted_subs)


def create_time_chunks(
    input_directory: str, output_directory: str, time_chunk_size_mins: int
):
    # iterate over all the files in the directory:
    for filename in os.listdir(input_directory):
        file = os.path.join(input_directory, filename)
        print(file)
        f = open(file)
        data = json.loads(f.read())

        # # logging
        # print(type(data))
        # print(f"data: {data}")

        # start with empty dict that you will keep adding to
        timechunks = {}

        # helper variables to keep track of position, timechunk size, and collating the text
        current_time_pos = 0
        running_composite = []
        chunk_num = 1

        # loop to create the chunks
        #! the last chunk might be getting skipped
        for chunk in data:
            end_time = chunk["start"] + chunk["duration"]
            print(f"endtime: {end_time}")
            print(f"current_time_pos: {current_time_pos}")
            if math.isclose(end_time, chunk_num * 60 * time_chunk_size_mins, abs_tol=5):
                text = " ".join(running_composite)
                timechunks[f"{current_time_pos} - {end_time}"] = text
                running_composite.clear()
                current_time_pos = end_time
                chunk_num += 1
            else:
                running_composite.append(chunk["text"])

        print(f"running_composite: {running_composite}")
        print(f"time chunks: {timechunks}")

        if len(running_composite):
            text = " ".join(running_composite)
            timechunks[f"{current_time_pos} - {end_time}"] = text

        # write the timechunks to a json file
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)
        with open(f"{output_directory}/{filename}", "w") as f:
            json.dump(timechunks, f)
