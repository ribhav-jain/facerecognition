import os
import pickle


def register_user(username, image):
    header, encoded = image.split(",", 1)
    try:
        try:
            data = pickle.loads(
                open(
                    os.path.abspath(os.curdir) + "/src/models/image_models/data.pickle",
                    "rb",
                ).read()
            )
        except Exception as e:
            print(e.__cause__)
            data = dict()
            with open(
                os.path.abspath(os.curdir) + "/src/models/image_models/data.pickle",
                "wb",
            ) as f:
                f.write(pickle.dumps(data))
            data = pickle.loads(
                open(
                    os.path.abspath(os.curdir) + "/src/models/image_models/data.pickle",
                    "rb",
                ).read()
            )
        data[username] = encoded
        with open(
            os.path.abspath(os.curdir) + "/src/models/image_models/data.pickle", "wb"
        ) as f:
            f.write(pickle.dumps(data))
    except Exception as e:
        print(e.__cause__)
        return "failed"
    return "success"
