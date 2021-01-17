# Telegram chatBot

> telegram API를 활용한 챗봇 만들기



## 1. 회원가입

- '텔레그램 웹'으로 접속하여 인터넷 환경에서 실행(모바일도 가능)



## 2. chatBot 생성

- BotFather 검색 > Start
- /newbot > bot 이름 설정
- HTTP API token 저장
- `t.me/<bot이름>` 으로 접속



## 3. 서버 설정

- VScode > Flask 패키지 다운로드

  - `pip install flask`  

  - `import Flask`

  - request 객체 사용 시

    - `from flask import Flask, request`

  - Flask 초기 사용

    ```python
    app = Flask(__name__)
    
    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    ```

- Ngrok 다운로드
  - mac >> `brew install ngrok`



## 4. Telegram APIs

- telegram API 검색 >> Telegram Bots >> Telegram Bot API 접속

- `app.py` 파일 소스

  ```python
  import random
  import requests
  from flask import Flask, request
  app = Flask(__name__)
  
  @app.route('/')
  def hello_world():
      return 'Hello, World!'
  
  @app.route('/telegram', methods=['POST'])
  def telegram():
      user_msg = request.get_json().get('message').get('text')
      user_id = request.get_json().get('message')
      					.get('from').get('id')
  
      token = "<telegram API에서 발급받은 토큰값>"
      url = f'https://api.telegram.org/bot{token}' +
      				'/<실행할 함수(sendMessage)>'
  
      if user_msg == '로또':
          result = sorted(random.sample(range(1, 46), 6))
      
      # 파파고 API 번역
      elif user_msg[:2] == '번역':
          text = user_msg[2:]
  
          request_url = 'https://openapi.naver.com' +
          							'/v1/papago/n2mt'
          headers = {"X-Naver-Client-Id": "<발급한 클라이언트ID>", 									"X-Naver-Client-Secret": "<발급한 Client Key>"}
          params = {"source": "en", "target": "ko", 															"text": text}
  
          response = requests.post(request_url, 																		headers=headers, data=params)
   
          result = response.json().get('message').															get('result').get('translatedText')
      else:
          result = '허용되지 않은 명령어'
          
  
      message_url = f'{url}?chat_id={user_id}&text={result}'
      requests.get(message_url)
  
      return '', 200
  
  if __name__ == '__main__':
      app.run(debug=True)
  ```

  

- `set_webhook.py` 파일 소스

  ```python
  import requests
  
  token = '<발급한 token>'
  url = f'https://api.telegram.org/bot{token}/setWebhook'
  ngrok_url = '<ngrok으로 생성한 url>/telegram'
  
  webhook_url = f'{url}?url={ngrok_url}'
  print(webhook_url)
  ```

  