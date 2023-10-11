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
