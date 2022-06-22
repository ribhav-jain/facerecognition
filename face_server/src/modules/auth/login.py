import os
import time
from base64 import b64decode
import face_recognition as fr
import pickle


def login_check(username, image):
    header, encoded = image.split(",", 1)
    file_new = str(time.time_ns())
    file_exist = str(time.time_ns())
    known_path = os.path.join(os.getcwd(), "images/known_faces/")
    unknown_path = os.path.join(os.getcwd(), "images/unknown_faces/")

    with open(unknown_path + file_new + ".png", "wb") as f:
        f.write(b64decode(encoded))

    data = pickle.loads(
        open(
            os.path.abspath(os.curdir) + "/src/models/image_models/data.pickle", "rb"
        ).read()
    )
    with open(known_path + file_exist + ".png", "wb") as f:
        f.write(b64decode(data[username]))

    try:
        try:
            got_image = fr.load_image_file(unknown_path + file_new + ".png")
            existing_image = fr.load_image_file(known_path + file_exist + ".png")
        except Exception as e:
            print(e.__cause__)
            return "image_not_found"
        got_image_facial_features = fr.face_encodings(got_image)[0]
        existing_image_facial_features = fr.face_encodings(existing_image)[0]
        results = fr.compare_faces(
            [existing_image_facial_features], got_image_facial_features
        )
        if results[0]:
            return "success"
        else:
            return "failed"
    except Exception as e:
        print(e.__cause__)
        return "image_not_clear"
