# Django



django 환경설정



## Code

- ##### django 프로젝트 시작하기

  `django-admin startproject firstpjt`

- ##### django server 시작하기

  > manage.py 파일이 있는 경로에서 실행

  `python manage.py runserver`

- ##### app 시작하기

  `python manage.py startapp 'app name'`



## 파일 시스템

- `__init__.py` 하나의 패키지로 인식할 수 있게 만들어줌
- `asgi.py`
- `settings.py` 해당 django 프로젝트의 모든 설정이 담김
  - INSTALLED_APPS
  - LANGUAGE_CODE : 언어 설정
  - 

- `urls.py` 
  - path 설정 : `urlpatterns`
- `views.py`
  - app 내에 위치
  - 함수의 첫번째 parameter : 반드시 `request`



## DTL(Django Template Language) Syntax

- ##### Variable

  - {{ variable }}

- ##### Filters

- ##### Tags

- ##### Comments



Variables

Filters

Tags

Comments





pjt 이름으로 쓰면 안되는 것들

request, library 이름들, built-in 함수, '-', test 등..



##  Model

웹 어플리케이션의 데이터를 구조화하고 조작하기 위한 도구



##### ORM

object-Relational-Mapping은 객체 지향 프로그래밍 언어를 사용하여 호환되지 않는 유형의 시스템간에 데이터를 변환하는 프로그래밍 기술

##### Migrations

`makemigrations`

model을 변경한 것ㅇ 기반한 새로운 마이그레이션(like 설계도)을 만들 때 사용

`migrate`

마이그레이션을 DB에 반영하기 위해 사용

설계도를 실제 DB에 반영하는 과정

모델에서의 변경 사항들과 DB의 스키마가 동기화를 이룸





##### READ

1. all()
2. get()

- 객체가 없으면 DoesNotExist 에러 발생
- 객체가 여러개일 경우 MultipleObjectsReturned 에러 발생
- 위와 같은 특징을 가지고 있기 때문에 unique 혹은 NOT NULL 특징을 가지고 있는 경우에만 사용 가능(pk로 조회)

3. filter()
4. Field lookups

- 



## REST Framework

##### Serialization(직렬화)

- 데이터 구조나 객체 상태를 동일하거나 다른 컴퓨터 환경에 저장하고 나중에 재구성할 수 있는 포맷으로 변환하는 과정
- 예를 들어 DRF의 Serializer는 Django의 Queryset 및 Model Instance와 같은 복잡한 데이터를, JSON, XML 등의 유형으로 쉽게 변환할 수 있는 Python 데이터 타입으로 만들어줌
- DRF의 Serializer는 Django의 Form 및 ModelForm 클래스와 매우 유사하게 작동



## CBV(Class Based View)

