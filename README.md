## virtual asset wallet

<br/>

<img width="320" alt="youtube" src="/public/images/mqdefault_6s%20(1).webp">

[virtual asset wallet 구현영상 보러 가기](https://youtu.be/vgL40S1QpMk)

<br/>

- 작업기간 : 2022.05.09 ~ 2022.05.20
- 설명 : 가상자산 지갑 구현
- Front-end = 김영서
- Back-end = 이의택

<br />

## 문서 정리

- [문서 정리 보러 가기](https://valiant-ankle-585.notion.site/c41c4b01cd6844aeb24b44d165414b85)

<br />

- [컴포넌트 설명, 사용되는 위치](https://valiant-ankle-585.notion.site/f547339232df4c0b8b82aa1d5b67068f)

<br />

## 기능 설명

### 로그인 화면 
<br />
<img width="600" alt="DB 스크린샷" src="/public/images/ezgif.com-gif-maker (6).gif">

- 사용자가 로그인하는 하면 
- 아이디는 이메일 형식에 맞게 입력 비밀번호는 8자 이상 100자 이하 대문자, 소문자, 숫자, 특수문자   
  동일한 문자가 3회 이상 반복되지 않는 정규식을 통과해야 fetch가 실행
- 이메일, 비밀번호를 입력하다가 다 지우면 이메일, 비밀번호를 입력하라는 문구가 출력
- 틀린 경우 올바르게 입력하라고 출력 

<br />

### 코인 리스트
<img width="600" alt="DB 스크린샷" src="/public/images/ezgif.com-gif-maker (5).gif">

- 거래소가 가지고 있는 모든 코인의 리스트를 보여주는 화면
- 클릭을 하면 해당 코인이 선택되면서 배경 색이 변경
- 검색을 통해 코인의 이름을 검색할 수 있다.
- 보유 화폐만 보기를 통해 자신의 보유 코인 정보를 확인 가능
- 코인 클릭 시 검색, 보유 화폐 기능을 사용해도 클릭이 풀리지 않음 

<br />

### 입금, 출금 
<img width="600" alt="DB 스크린샷" src="/public/images/ezgif.com-gif-maker (4).gif">

- 해당 코인에 대해 입금, 출금을 할 수 있는 화면
- 코인 리스트에서 코인을 클릭하면 입금 주소와 qr코드 생성
- 복사 버튼 클릭 시 해당 주소 복사
- 출금할 주소, 수량을 입력하면 출금 
- 출금 수량에 숫자가 아닌 다른 값을 입력하면 올바른 값을 입력하라는 문구 출력
- 출금 가능 수량보다 많이 입력하면 초과 문구 출력 

<br />

### Main 입출금 내역
<img width="600" alt="DB 스크린샷" src="/public/images/ezgif.com-gif-maker (3).gif">

- main page에서 클릭한 해당 코인에 대한 입출금 내역을 보여주는 화면
- 기간, 입금, 출금, 전체에 대한 검색 가능
- 초기화 버튼을 통해 검색 설정을 초기화 가능
- 진행되고 있는 정보만 보기 가능
- 새로고침 버튼으로 전에 검색된 정보를 한 번 더 검색
- csv 다운로드를 통해 검색된 정보를 csv 파일로 다운로드 가능 

<br />

### Detail 입출금 내역
<img width="600" alt="DB 스크린샷" src="/public/images/ezgif.com-gif-maker (2).gif">

- main 입출금 내역과 비슷하지만 전체 코인에 대한 입출금 내역을 보여주는 화면
- 전체 코인 정보이기 때문에 이름 검색을 통해 특정 코인의 입출금 내역 확인 가능 


<br/>

## DB diagram

<img width="882" alt="DB 스크린샷" src="/public/images/db.png">

<br/>
