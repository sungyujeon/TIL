# Firebase 활용

### To-Do

- [x] Firebase React(Javascript) 프로젝트 생성
- [x] Firebase Authentication 소셜 로그인
- [ ] 소셜 로그인(카카오)
- [ ] Cloud Firestore(Key-Value DB 학습) 연동
- [ ] Firebase Storage (저장소 관리)
- [ ] Firebase Functions(백엔드 함수 호출)

---

> 구글의 클라우드 자동화 환경 `Firebase`를 이용하여 클라우드 인프라 환경의 경험을 해보고 더 나아가 권한관리, 로그인 연동, 함수 호출의 과정을 익힘.
>
> React framework에서의 firebase 활용
>
> > ##### 목표
> >
> > - Firebase React(Javascript) 프로젝트 생성
> >
> > - Firebase Authentication 소셜 로그인 카카오, Google 연동
> >
> > - ~~Cloud Firestore(Key-Value DB 학습) 연동~~
> > - ~~Firebase Storage (저장소 관리)~~
> > - ~~Firebase Functions(백엔드 함수 호출)~~



## Create a Firebase project

##### Firebase

- Firebase 프로젝트는 Firebase의 최상위 항목
- 프로젝트에서 iOS, Android, 웹앱을 등록해 Firebase 앱을 만듦



##### Firebase 프로젝트와 Google Cloud 간의 관계

- Google Cloud 프로젝트는 데이터, 코드, 구성, 서비스의 가상 컨테이너
- Google Cloud 내에 Firebase 관련 서비스를 추가적으로 포함하는 개념
- 따라서 Firebase project 생성 시 Google Cloud 프로젝트가 자동으로 생성됨(Google Cloud 프로젝트가 존재해야 Firebase 관련 서비스를 추가할 수 있으므로)



##### Firebase project 생성

- [Firebase Console](https://console.firebase.google.com/u/0/)에서 프로젝트 생성

  ![](src/create-firebase-project.png)

- The project name: 생성 시 project name은  [Firebase Console](https://firebase.google.com/docs/projects/learn-more?authuser=0#manage-console), [Google Cloud Console](https://cloud.google.com/docs/overview/?authuser=0#google-cloud-console), [Firebase CLI](https://firebase.google.com/docs/projects/learn-more?authuser=0#manage-cli) 에서 프로젝트의 내부 전용 이름임. 따라서 외부에 노출되지 않고 다양한 프로젝트를 관리하는 용도로 사용됨

- The project number: 프로젝트 고유 식별자는 타사 서비스에서 API 호출 시 사용



##### Firebase config files and objects

- Firebase config files 또는 objects는 특정 Firebase project와 resource(DB, storage bucket)에 연결
  - iOS: `GoogleService-Info.plist` config file 추가
  - Android: `google-services.json` config file 추가
  - Web apps: Firebase config object 추가
- 해당 파일이나 객체는 Firebase options를 포함
  - API KEY: 비공개 사용자 데이터에 접근할 필요가 없는 특정 API를 호출할 때 사용되는 간단한 암호화 문자열
  - Project ID: 모든 Firebase 및 Google Cloud에서 프로젝트의 사용자 정의 고유 식별자. 일반적으로 프로젝트를 참조하기 위한 편의성 별칭으로 취급됨
  - Application ID('AppID'): 모든 Firebase에서 Firebase 앱의 고유 식별자. 형식은 플랫폼에 따라 다름
    - iOS / Android / Web apps 



##### Tools to manage a Firebase project

- Firebase Console : Firebase project 내 GUI console
- ~~Firebase CLI~~ : ~~hosting, cloud functions와 같은 특정 product를 관리~~
- ~~Firebase Management REST API~~ : ~~programatical managing 가능~~



## Register an app with Firebase

##### (React) JavaScript Project 생성

```bash
$ npx create-react-app project-name .
```



##### Register an app

- firebase project console dashboard 아래 Web apps 등록

- 등록한 Firebase project를 app에 추가하는 4가지 방식 : npm / CDN / Hosting URL / Node.js app

  - npm

    ```bash
    $ npm init
    $ npm install --save firebase
    ```

    ```js
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "",
      ...
    }
    firebase.initializeApp(firebaseConfig)
    ```

  - CDN : firebase console 내 CDN script 이용

    ```html
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js"></script>
    
    <script>
      const firebaseConfig = {
        apiKey: "",
        ...
      }
        
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    </script>
    ```

  - [Hosting URL 연결]



## Firebase Authentication

> FirebaseUI 인증, FirebaseSDK 인증, 

##### FirebaseUI

> 이메일/비밀번호, 이메일 링크, 휴대전화 인증, provider(e.g. Google, Github) 등의 방법으로 로그인하는 interface 제공

- npm or ~~CDN~~  등록

  ```bash
  $ npm install firebaseui
  ```

- source file 내 require 처리

  ```js
  const firebase = require('firebase')
  const firebaseui = require('firebaseui')
  ```

- SDK 가져온 후 인증 UI 초기화

  ```js
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  ```

- Login 방법 설정

  [Docs 참조](https://firebase.google.com/docs/auth/web/firebaseui?authuser=0)



##### Firebase SDK

- Google

  - Google provider instance 생성

    ```js
    const provider = new firebase.auth.GoogleAuthProvider()
    ```

  - Firebase에 인증

    팝업창을 띄우거나 로그인 페이지로 redirection 하여 사용자가 Google 계정에 로그인하도록 유도(휴대기기의 경우 redirection 권장)

    ```js
    firebase.auth()
    	// .signInWithPopup(provider)
      .signInWithRedirect(provider)
      .then((result) => {
        const credential = result.credential;
        const token = credential.accessToken;
        const user = result.user;
        // ...
      
      }).catch((error) => {
        console.log(error)
    });
    ```

    

##### 사용자 관련 함수

- 현재 로그인한 사용자 가져오기

  ```js
  // onAuthStateChange()를 설정 시 getRedirectResult가 해결될 때까지 기다린 후에 triggered
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  
  // currentUser로 가져오면 현재 로그인한 사용자를 가져오고, 없으면 return null
  const user = firebase.auth().currentUser;
  ```

- 프로필 가져오기

  ```js
  const user = firebase.auth().currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
  ```

- provider별 사용자 프로필 가져오기

  ```js
  const user = firebase.auth().currentUser;
  
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
  ```

- 이외 함수 [Docs 참조](https://firebase.google.com/docs/auth/web/manage-users?authuser=0)

