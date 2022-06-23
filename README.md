<h1 align="center"> Face Recognition </h1>

<h3 align="center"> A face recognition based login system using Deep learning, Flask and React! <br><br>
  
[![Github](https://img.shields.io/github/license/ribhav-jain/facerecognition)](https://github.com/ribhav-jain/facerecognition/blob/master/LICENSE)
[![Github](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/ribhav-jain/facerecognition)
[![nodejs](https://img.shields.io/badge/node-16.13.2-orange)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-8.3.2-blue)](https://www.npmjs.com)
[![Python](https://img.shields.io/badge/Python-3.8%20|%203.9%20|%203.10-ff69b4)](https://www.python.org)

</h3>

<p align="center"> 
    <a href="https://ribhav-jain.github.io/facerecognition" target="_blank">
    <img src="images/FaceRecognitionUI.png"></img>
  </a>
</p>

To view a live example, **[click here](https://ribhav-jain.github.io/facerecognition)**

## How to Use 📋

### Front End

- You'll need Node.js (which comes with npm) installed on your computer. While installing `nodejs`, try to install versions which are equal or greater than the versions mentioned in badges above.
- After the successful installation of `nodejs` and `npm`, clone the repository into your local system.

```bash
# Clone this repository
git clone https://github.com/ribhav-jain/facerecognition.git

# Go into the repository
cd facerecognition/face-rec-ui/

# Install dependencies
npm install

# Start a local dev server, it will open the website locally on your browser
npm start
```

### Back End

- You'll need python (which comes with pip) installed on your computer. While installing `python`, try to install versions which are equal or greater than the versions mentioned in badges above.

```bash
# Go into the repository
cd facerecognition/face_server/

# Install dependencies
pip install -r requirements.txt

# To see the help message and usage instructions
python -m face_server

# First run
face_server create-db
face_server populate-db  # Optional

face_server run
```

## Technologies used 🛠️

- [React](https://reactjs.org/)
- [tsParticles](https://particles.js.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Dlib](http://dlib.net/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.

## Contributing 💡

If you have any suggestions on what to improve in this. Please don't hesitate to open a [pull request](https://github.com/ribhav-jain/facerecognition/pulls) or [issue](https://github.com/ribhav-jain/facerecognition/issues).
