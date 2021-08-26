# Figma

> 참고 사이트 : [figma 공식 유튜브](https://www.youtube.com/channel/UCQsVmhSa4X-G3lHlUtejzLA)



## 개요

##### [Fimga Community](https://www.figma.com/community)

- 사람들이 resource 들을 모아놓은 커뮤니티
- wireframe ui kit를 사용할 수 있어, 해당 파일을 복사해 가져와 초안으로 사용할 수 있음
- 해당 파일이 열리면 제목 입력창 설정에서, 팀에 추가하고 publish library를 통해 library를 등록시킴
- 원본 파일에서 assets - click book icon - library toggle on
- generic, button, icon, layout 등의 컴포넌트들을 재사용할 수 있음



##### Instances

- Main Component와 해당 컴포넌트의 속성을 갖는 instances가 있다면, main component만 변경해도 instances에 반영됨



##### Constraints

-  constraints를 이용하면 프레임 사이즈가 변할 때 해당 프레임 안에 있는 컴포넌트들의 위치가 constraints 값에 따라 변동됨
- 예를 들어 constraints 값을 bottom, right로 설정해두면 오른쪽 아래에 고정되어 프레임 사이즈가 변경되어도 오른쪽 아래에 위치하게 됨



##### Feedback

- 레이어 패널 - assets - book button click - 'Crit notes' 허용 toggle on
- Crit note 선택하여 feedback comment 남기기



##### 단축키

- `F` : 새로운 프레임
- `T` : 새로운 텍스트
- `R` : Rectangle
- `O` : Circle
- `C` : comment
- `alt + drag` or `alt + D` or `ctrl + C and V` : 컴포넌트 복사
- `ctrl + shift + K` : 이미지 넣기
- `shift + A` : Auto Layout
- `ctrl + alt + K` : Create Component
- `ctrl + R` : rename frame
- `shift + R` : guide ruler
- `shift + 2` : zoom to frame



## 피그마 프로젝트 디자인하기(기본)

##### Pages and set up

- 레이어 패널 - Pages - `+` 버튼 클릭하여 새로운 페이지 생성
- `F` 로 프레임 생성 및 설정(가로 세로 등)



##### Measuring

- 컴포넌트의 상대 위치 확인
  - 해당 컴포넌트 클릭 - `alt + hover over the component`
- guides
  - ruler 이용해 guide line 사용 가능
  - `shift + R`

##### Layout Grids

- 레이어 패널 - LAYOUT GRID - 속성 조정

- `ctrl + G` : 그리드 숨기기/보이기
- align layer의 그리드를 강제로 계속 적용하고 싶다면 속성 패널에서 Layout Grid 설정
- Grid, Columns, Rows >> flex와 비슷



##### Corner Radius

- 레이어 패널 - Design - Corner radius 설정
- border radius 설정하는 옵션



##### 이미지 넣기

- `ctrl + shift + K`로 이미지 넣기
- 이미지를 2개 넣는다고 하면 첨부된 이미지들을 하나씩 넣을 수 있는데, 사각형이나 원 등 컴포넌트에 클릭하면 해당 컴포넌트 크기에 맞게 이미지가 추가됨
- 이미지를 특정 프레임 안에서 사용 시에 이미지 속성으로 조정
  - fill - color - image (속성 변경)
  - 세부속성 : fill / fit / crop / tile



##### 텍스트 속성

- 레이어 패널 - Text(세부 내용 생략)
- Stark plugin
  - UI 상으로 텍스트 컬러가 사용자에게 가시성이 좋지 않을 수가 있음(text contrast(대비)가 좋지 않음)
  - Stark 플러그인을 설치해 해당 contrast를 자동으로 변경할 수 있음
  - 메뉴 - Plugins - Browse Plugins in Community - install Stark plugin
  - font layer 오른쪽 클릭 - Plugins - Stark - Check Contrast 
  - contrast 비율을 통과해야 적정한 컬러라는 것임(컬러는 수동 조정)
  - `alt + ctrl + P`



##### Positioning

- 이미지 + 텍스트를 동시에 선택하고 align 속성을 선택할 시 같이 적용(e.g. vertical align center)



##### Clip content

- 페이지의 layer 가로 세로 크기를 고정하여, 해당 범위를 벗어난 컨텐츠들은 보이지 않게 하고 싶으면 default로 속성 패널의 Clip content가 applied 되어 있음
- 하지만 스크롤을 하여 많은 Feeds 들을 봐야 하는 경우가 생기는 것처럼 유동적으로 변하게 하고 싶다면 Clip content 항목을 체크 해제해야 함
- 이렇게 하면 layout이 해당 feeds 들의 가로나 세로 크기에 맞게 늘어나지 않는데, 이 때 auto layout 속성을 활성화시키면 프레임이 함께 늘어나게 됨
- 해당 프레임은 rename 하여 관리하는 것이 좋음



##### Vector networks

- icon 들을 사용하게 될 경우가 있는데 [figma community](https://www.figma.com/community)의 icons 등에서 찾아서 적용할 수 있음
- 또는 pen을 이용해 벡터 이미지를 직접 커스텀하여 만들 수 있음
- 만들어진 아이콘 등은 Pages/Components/Icon 폴더에 넣어서 관리하는 것이 좋음



##### Boolen operations

![boolean-operation](src/boolean-operation.png)

- objects 선택 후 상단 중앙 Boolean groups에서 설정



##### Scrolling and Fix position

- 실제 디바이스에서 테스트할 때 특정 device의 크기에 맞춰 테스트할 수 있도록 하는 것
- 속성 패널 - Prototype - Device 선택 - Present(재생버튼)
- ~~잘 이해가 가지 않음~~



##### swap

- swap 될 instance가 같은 컴포넌트 안에 속해있어야 함

- `alt + ctrl` + drag



##### Fix position

- 속성 패널 - constraints - Fix position when scrolling 체크



##### Feedback

- 팀원 초대 후(저흰 이미 되어 있는) comment 생성 후 피드백



---

> 중요하게 다뤄야 한다고 생각한 내용은 아래처럼 \<h2> 태그로 별도로 구분하였습니다.

## Styles

- Color, Typography, Effects 등 프로젝트 공통적으로 사용하는 스타일을 지정하여 사용
- 해당 스타일이 적용된 컴포넌트 또는 오브젝트는 해당 스타일이 바뀌면 모두 공유
- Color
  - 레이어 패널 - Fill - Color Styles - naming
  - default style이 적용되어 있을 경우 detach style을 클릭하여 스타일 적용이 더이상 되지 않게 변경 가능
- Typography
  - 레이어 패널 - Text - Style 버튼 클릭 - add new style - naming
- Effects
  - 레이어 패널 - Effects - Effect Stylee(+) - naming
- Local Default Style
  - 스타일을 생성하여 등록하고 캔버스를 클릭하면 기본으로 적용되는 Style 지정 가능



## Auto Layout

- 수평, 수직 등 레이아웃을 내용이 바뀌더라도 동일하게 적용하게 해주는 것
- auto layout을 설정해두면 추가적으로 스타일을 변경하지 않아도 되는 장점이 있음
- item 간 margin, padding, alignment 설정 가능
- `shift + A` 자동 적용 후 레이어패널에서 커스텀 설정
- Resizing
  - Hug contents : 컨텐츠에 맞게 조절
  - Fixed width : 설정한 width에 맡게 고정
  - Fill Container : 설정한 container만큼 고정

 

## Create Components

- 컴포넌트화 하여 추후 재사용 가능하게 만들 수 있음
- 사용
  - 컴포넌트화 하려는 object들을 모두 선택한 후 상단 가운데 Create Component 클릭
  - 컴포넌트 안에 들어가는 obejct naming을 바꿔주는 것도 중요함
  - `ctrl + alt + K`

- 컴포넌트 추출 및 사용
  - 레이어 패널 - plus pages - create Components(컴포넌트들을 관리하기 위해 naming을 `Components로 만들어서 공유`)
  - 컴포넌트로 만든 후 해당 컴포넌트 오른쪽 클릭 - Move to page - Components에 삽입
  - 레이어 패널 - Assets - 만든 components 재사용



## Build prototypes

- 각 페이지별 프로토타입들을 한 번에 빌드하는 것
- 특정 버튼을 클릭했을 때 다른 프레임으로 전환하게 하는 등 실제 앱처럼 작동하는 효과를 줄 수 있음
- 이러한 연결을 `prototype connections`라고 하는데, 세가지로 구성됨
  - hotspot(커넥션 시작 지점)
    - 시작할 지점의 object 클릭 - prototype 모드에서 connection icon 클릭 - arrow를 destination frame으로 지정
  - connection(interaction detail을 저장)
    - 속성 패널 - prototype - Interaction에서 지정
    - 특정 event 발생 시점(on tap, on drag, mouse enter, hover 등)
    - 기본 instant >> 특정 interaction animation 지정
  - destination(커넥션 종료 지점)
- 속성 패널 - Prototype 클릭 후 프로토타입 모드로 전환



## Use as a developer

- [Figma tutorial: Handoff seamlessly to developers](https://www.youtube.com/watch?v=B242nuM3y2s&list=PLXDU_eVOJTx7MP9zntloRasBbGE5P0i66&index=3)
