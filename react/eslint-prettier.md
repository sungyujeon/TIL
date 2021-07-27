# ESLint & Prettier 적용하기

> git pull을 통해 package.json, .eslintrc.js, .prettierrc.js 파일을 받은 경우 1) extensions 설치, 2) `npm install` 명령어를 통한 의존 패키지를 설치, 3) 마지막 vscode 설정 파일만 수정한다.



## ESLint와 Prettier

> ##### ESLint
>
> - 문법 검사 및 더 나은 js 코딩 스타일을 위한 ESLint 도구
>
> - CRA로 만들어진 프로젝트의 경우 내장
>
> ##### Prettier
>
> - ESLint는 사전에 정의한 코딩 스타일과 맞지 는다면 경고나 에러 메시지를 출력
> - Prettier는 이러한 세부 설정을 유지하면서 코드를 자동으로 정리해주는 도구
> - 커스터마이징이 자유롭고 ESLint와 연동 가능



## ESLint

- 터미널 창에서 ESLint가 문법 검사를 하여 오류를 보여주지만, VSCode 에서도 바로 경고나 에러를 확인하고자 하면 extension 설치해야 함
- extension `ESLint` 설치



## Prettier

- extension `Prettier - Code Formatter`  설치
- `shift` + `option` + `F` 누르면 실행(mac 기준)



## Airbnb 스타일 연동

- 사전 설치 패키지 확인

  - 아래 명령어를 통해 확인하면 eslint-config-airbnb를 설치하기 위해 사전에 설치해야 하는 패키지 목록을 알 수 있음

    ```bash
    $ npm info "eslint-config-airbnb@latest" peerDependencies
    ```

  - CRA v2를 통해서 만들면 자동으로 설치되어 있으나, 아래 명령어를 통해 수동 설치를 할 수도 있음(global 설치가 아닌 devDependencies로 설정해야 하므로 `-peerdeps --dev`를 꼭 넣어야 함)

    ```bash
    $ npx install-peerdeps --dev eslint-config-airbnb
    (Global 설치가 아닌 devDependencies로 해야하므로 -peerdeps --dev를 꼭 넣자!)
    ```

  - package.json에 아래 부분이 추가되어 있는 것을 확인

    ```json
    "devDependencies": {
      "eslint": "7.2.0",
      "eslint-config-airbnb": "18.2.0",
      "eslint-plugin-import": "^2.21.2",
      "eslint-plugin-jsx-a11y": "^6.3.0",
      "eslint-plugin-react": "^7.20.0",
      "eslint-plugin-react-hooks": "4.0.0"
    }
    ```

- airbnb의 규칙이 까다로우므로, 향후 내가 설정한 ESLint가 따르지 않았으면 하는 규칙들을 설정하기 위해 필요한 패키지를 설치하고 추가 세팅 진행

  - .eslintrc.js 설정

    ```js
    // .eslintrc.js
    
    module.exports = {
      env: {
        browser: true,
        es6: true,
        node: true,
      },
      extends: ['airbnb', 'plugin:prettier/recommended'],
      rules: {
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.js', '.jsx'],
          },
        ],
        'linebreak-style': 0,
      },
    };
    ```

  - .prettierrc.js 설정(custom 가능)

    ```js
    // .prettierrc.js
    
    module.exports = {
      // 문자열은 홀따옴표(')로 formatting
      singleQuote: true,
      //코드 마지막에 세미콜른이 있게 formatting
      semi: true,
      //탭의 사용을 금하고 스페이스바 사용으로 대체하게 formatting
      useTabs: false,
      // 들여쓰기 너비는 2칸
      tabWidth: 2,
      // 객체나 배열을 작성 할 때, 원소 혹은 key-value의 맨 뒤에 있는 것에도 쉼표를 붙임
      trailingComma: "all",
      // 코드 한줄이 maximum 80칸
      printWidth: 80,
      // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략하게 formatting
      arrowParens: "avoid",
    };
    ```

- 여기까지 완료하였으면 단축키를 통해 자동 포맷팅을 할 수 있다. 하지만 저장 시에 자동으로 포맷을 적용하게 하려면 다음과 같은 연동을 해주어야 한다.

  - 패키지 설치

    - eslint-config-prettier: ESLint와 Prettier에 중복되는 Formatting 룰 삭제
    - eslint-plugin-prettier: ESLint에 Prettier의 Formatting 기능 추가

    ```bash
    $ npm install --save-dev eslint-plugin-prettier eslint-config-prettier
    ```

  - eslint config 파일을 수정해 ESLint의 formatting 규칙들을 비활성화 시키는 eslint-config-prettier를 적용하기 위해 아래와 같이 eslint config 파일을 수정(위 .eslintrc.js에 이미 적어놓음. 단순히 참고용으로 추가)

    ```json
    extends: ['airbnb', 'plugin:prettier/recommended'],
      // 다른 config를 사용하더라도 prettier를 맨 마지막에 넣어야 모든 중복 규칙을 비활성화 시킬 수 있다.
      // add eslint-config-prettier to the "extends" array in your .eslintrc.* file. Make sure to put it last, so it gets the chance to override other configs.
    ```

  - settings 수정

    - cmd + , 를 통해 설정 파일을 들어가 소스 코드 보기로 전환하고 아래 설정들을 수정

    ```json
      "editor.formatOnSave": true,
      "[javascript]": {
        "editor.formatOnSave": false
      },
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.alwaysShowStatus": true,
      "prettier.disableLanguages": ["js"],
      "files.autoSave": "onFocusChange",
    ```
