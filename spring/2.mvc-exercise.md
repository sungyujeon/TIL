## Controller

> 사용자의 요청을 받아 비즈니스 로직을 실행하기 위한 service를 resource로 활용해 service 클래스의 로직 함수 호출

##### @Controller vs @RestController

- `@RestController` == `@Controller` + `@ResponseBody`
- Controller의 역할은 Model 객체를 만들어 데이터를 담고 View를 찾는 것이지만, RestController는 단순히 객체만을 반환하고 객체 데이터는 JSON 또는 XML 형식으로 HTTP 응답에 담아 반환
- Controller
  - @Controller가 View를 반환하기 위해서는 viewResolver가 사용되며, ViewResolver 설정에 맞게 View를 찾아 렌더링
  - @ResponseBody를 사용하여 Json 형태로 반환
- RestController
  - Data를 반환하기 위해 viewResolver 대신에 HttpMessageConverter가 동작
  - 데이터의 종류에 따라 서로 다른 MessageConverter가 작동



##### @RequestMapping

- `@RequestMapping`은 `DefaultAnnotationHandlerMapping`에서 컨트롤러를 선택할 때 대표적으로 사용하는 annotation
- url당 하나의 컨트롤러에 매핑되던 다른 핸들러매핑과는 달리 메서드, 파라미터, 헤더 등 더 넓은 범위에 적용 가능
- 클래스와 메서드에 붙은 `@RequestMapping` annotation 정보를 결합해 매핑정보를 생성
- 세부내용 [참조](https://joont92.github.io/spring/@RequestMapping/)



##### ResponseEntity

- Spring Framework에서 제공하는 클래스 중 HttpEntity는, HTTP 요청(Request) 또는 응답(Response)에 해당하는 HttpHeader와 HttpBody를 포함
- HttpEntity 클래스를 상속받아 구현한 클래스가 RequestEntity, ResponseEntity
- ResponseEntity는 사용자의 HttpRequest에 대한 응답 데이터를 포함하는 클래스이므로, `HttpBody`, `HttpHeaders` , `HttpStatus`를 포함



##### ModelAndView

- `Model` vs `ModelMap` vs `ModelAndView`

  > 데이터만 저장 vs 데이터와 이동하고자 하는 View Page를 같이 저장

  - Model, ModelMap 공통점

    - model.addAttribute("변수명");
    - modelMap.addAttribute("변수명");
    - 둘 다 addAttribute() 사용
    - Model or ModelMap에 데이터만 저장 후 View에서 사용

  - Model, ModelMap 차이점

    - Model : 인터페이스
    - ModelMap : 클래스

  - ModelAndView

    ```java
    @RequestMapping(value = "/test.do")
    public ModelAndView test(HttpServletRequest request, ModelAndView mav){
            
        String modelAndViewStr = "ModelAndView Test";
        
        mav.addObject("mavVar", modelAndViewStr);
        mav.setViewName("tmp/test");
            
        return mav;
    ```

    - addObject를 통해 데이터를 저장
    - setViewName을 통해 이동하고자 하는 View를 저장

  
