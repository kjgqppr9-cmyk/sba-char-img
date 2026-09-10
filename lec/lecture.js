/* 스몰브랜드설계자 강의 페이지 — 블록 6a7aa8b19d33120ca3bf1c5f 의 스크립트.
   로더 블록이 이 파일을 불러온 뒤 window.__sbaLecRun(bm) 을 호출한다. bm.container 안에 템플릿이 이미 있다. */
window.__sbaLecRun = function(bm){
/* 루트 엘리먼트 — 로컬 시안은 document, 식스샵 블록으로 변환되면 bm.container. */
function hostEl(){ return bm.container; }   /* @HOST */
function q(sel){ const h = hostEl(); return h ? h.querySelector(sel) : null; }

/* ══════════════════════════════════════════════════════════════
   ▼▼▼ 여기만 고치면 세 화면이 전부 따라 바뀝니다 ▼▼▼
   status: upcoming(모집예정) open(모집중) closed(모집완료) running(강의중) done(강의완료)

   status:"auto" 는 모집기간·강의일자를 보고 스스로 바뀝니다.
   조기 마감처럼 예외를 줄 때만 값을 직접 적으세요 — 수동이 우선입니다.

   kind:"invite" 는 초청 강의입니다. 신청을 받지 않으므로
   '모집 중' 칸에 뜨지 않고, 달력에서는 금색 점이 하나 더 붙습니다.

   pitch 를 적어 두면 '모집 중' 카드 안에 소개가 그대로 펼쳐집니다.
   info 는 일시·시간·장소 — 신청 버튼 바로 위 큰 글씨로 나갑니다.
   sessions 의 tag 는 회차 주제, do 는 그 시간에 손으로 만드는 것입니다.

   정원(capacity)은 화면에 안 보여 준다 — 남은 자리를 공개하면 눈치 게임이 된다.
   ══════════════════════════════════════════════════════════════ */
const LECTURES = [
  {
    id:"mfs-1", title:"마켓-핏 스케일러", edition:"1차", status:"auto",
    host:"상지대학교 창업보육센터",
    summary:"AI로 PMF를 진단하고 고객을 나눈 뒤, 시장·경쟁 분석과 구매전환율 개선을 거쳐 네이버 검색광고 세팅까지.",
    apply:{from:"2026-07-21", to:"2026-07-30"},
    sessions:[
      {date:"2026-07-31", n:1, title:"AI 기반 PMF 진단 및 핵심 고객 세분화"},
      {date:"2026-08-01", n:2, title:"시장·경쟁 인텔리전스 분석"},
      {date:"2026-08-07", n:3, title:"상세페이지·홈페이지 구매전환율(CVR) 개선"},
      {date:"2026-08-08", n:4, title:"네이버 검색광고 실전 세팅 및 3개월 성장 로드맵"}
    ],
    hours:20, capacity:13, enrolled:7,
    rating:5.0, ratingCount:5, respondents:5,
    reviews:[
      {q:"우리 제품 브랜딩과 강점을 확인해서 상세페이지와 상품명을 개선하는 데 큰 도움을 받았어요. 유료 강의보다 더 좋았습니다.", who:"식품 제조 · 대표"},
      {q:"마케팅 흐름의 이해도를 높여주는 강의가 좋았습니다.", who:"스마트팜 제조 · 대표이사"},
      {q:"광고 마케팅 부분이 가장 도움이 되었습니다. 기회가 되면 또 참여하고 싶습니다.", who:"식품 제조 · 대표"},
      {q:"페르소나와 클로드를 이해하게 되어 좋았습니다.", who:"떡 제조 · 대표"},
      {q:"전반적으로 이해하기 쉽게 설명해 주셨습니다.", who:"식품 제조 · 직원"}
    ],
    detail:`
## 이런 분을 위한 교육입니다
- 상품은 좋은데 **검색해도 안 나오는** 사장님
- 광고를 켜봤지만 **돈만 나가고** 끝난 경험이 있는 사장님
- 내 제품이 **누구에게 맞는 물건인지** 정리해 본 적 없는 사장님

## 회차별 커리큘럼
| 회차 | 날짜 | 교육 주제 | 손에 남는 것 |
| --- | --- | --- | --- |
| 1회 | 7/31(금) | AI 기반 PMF 진단 및 핵심 고객 세분화 | PMF 진단 보고서 · 핵심 고객 세그먼트 정의서 |
| 2회 | 8/1(토) | 시장·경쟁 인텔리전스 분석 | 시장·경쟁 분석 리포트 |
| 3회 | 8/7(금) | 상세페이지·홈페이지 구매전환율(CVR) 개선 | 상세페이지·홈페이지 개선안 |
| 4회 | 8/8(토) | 네이버 검색광고 실전 세팅 및 3개월 성장 로드맵 | 퍼포먼스 마케팅 운영 전략서 · 3개월 실행 로드맵 |

## 진행
- 교육 기간 **7월 31일(금) ~ 8월 8일(토)** · 13:00–18:00 (회차당 5시간)
- 교육장 **상지대학교 창업보육관 3층 라운지**
- 전 회차 실습형 · 마지막 30분은 사전 설문 기반 진단과 Q&A
- 교육 총괄 **김대우** · 공동 진행 **성미경**

## 수료 후
- **1:1 맞춤형 컨설팅** 8월 10일(월) ~ 8월 14일(금) · 사업장 방문 원칙
- 컨설팅 보고서는 실시일로부터 2주 이내 제공
`
  },
  {
    id:"omni-1", title:"옴니채널 브랜딩 빌드업", edition:"1차", status:"auto",
    host:"상지대학교 창업보육센터",
    summary:"브랜드 메시지를 정리하고, AI로 카피·이미지·숏폼을 직접 만들어 흩어진 채널을 하나의 운영 체계로 묶습니다.",
    apply:{from:"2026-08-01", to:"2026-08-07"},
    sessions:[
      {date:"2026-08-12", n:1, title:"브랜드 아이덴티티 및 옴니채널 전략 수립"},
      {date:"2026-08-14", n:2, title:"AI 카피라이팅·SNS 콘텐츠 기획 및 AI 이미지 제작"},
      {date:"2026-08-19", n:3, title:"AI 이미지 제작 심화 및 영상·숏폼 트렌드 시연"},
      {date:"2026-08-21", n:4, title:"옴니채널 통합 운영 및 성과 분석"}
    ],
    hours:10, capacity:13, enrolled:7,
    rating:null, ratingCount:0,
    reviews:[],
    detail:`
## 이런 분을 위한 교육입니다
- 채널마다 **말투와 분위기가 제각각**인 사장님
- 만들 때마다 **매번 다른 그림**이 나와 답답한 사장님
- 만드는 법이 아니라 **교육 중에 실제 콘텐츠**를 뽑아 가고 싶은 사장님

## 회차별 커리큘럼
| 회차 | 날짜 | 교육 주제 | 담당 | 손에 남는 것 |
| --- | --- | --- | --- | --- |
| 1회 | 8/12(수) | 브랜드 아이덴티티 및 옴니채널 전략 수립 | 성미경 | 브랜드 가이드 |
| 2회 | 8/14(금) | AI 카피라이팅·SNS 콘텐츠 기획 및 AI 이미지 제작 | 김대우 | 옴니채널 콘텐츠 캘린더 · 채널별 콘텐츠 운영안 |
| 3회 | 8/19(수) | AI 이미지 제작 심화 및 영상·숏폼 트렌드 시연 | 김대우 | 비주얼 콘텐츠 제작안 · 숏폼 콘텐츠 기획안 |
| 4회 | 8/21(금) | 옴니채널 통합 운영 및 성과 분석 | 김대우 | 옴니채널 통합 운영안 |

## 진행
- 교육 기간 **8월 12일(수) ~ 8월 21일(금)** · 15:00–17:30 (회차당 2시간 30분)
- 총 10시간 · 교육장 **상지대학교 창업보육관 3층 라운지**
- 전 회차 실습형 · 마지막 30분은 사전 설문 기반 진단과 Q&A

## 수료 후
- **1:1 맞춤형 컨설팅** 8월 24일(월) ~ 8월 28일(금) · 사업장 방문 원칙
- 컨설팅 보고서는 실시일로부터 2주 이내 제공
`
  },
  {
    id:"mfs-2", title:"마켓-핏 스케일러", edition:"2차", status:"auto",
    host:"상지대학교 창업보육센터",
    summary:"1차와 같은 커리큘럼으로 다시 엽니다. 1차 수강생 만족도 5.0의 과정입니다.",
    apply:{from:"2026-08-26", to:"2026-09-05"},
    pitch:{
      kicker:"전 과정 AI 실습 · 입주기업 마케팅 + 매출 성장 프로그램",
      head:"제품은 좋은데,<br>왜 안 팔릴까?",
      sub:"그 이유를 찾아내고 팔리게끔 바꾸는 <b>20시간</b>"
    },
    info:{
      when:"9월 7 · 8 · 14 · 15일<br>(월 · 화 이틀씩 두 주)",
      time:"오후 1시 ~ 6시<br>(하루 5시간 · 총 20시간)",
      place:"상지대학교 창업보육관<br>3층 라운지"
    },
    note:"<b>노트북 지참</b>과 <b>AI 유료 구독</b>(Claude 또는 ChatGPT)이 필요합니다. "
        + "수료 후 <b>1:1 컨설팅</b>이 사업장 방문으로 이어집니다.",
    perk:"수료한 팀 중 <b>3팀</b>을 선정해 마케팅·홍보에 쓸 수 있는 "
        + "<b>100만 원 상당 솔루션</b>을 지원합니다.",
    sessions:[
      {date:"2026-09-07", n:1, title:"우리 제품, 정말 시장에 맞습니까",
       tag:"PMF 진단", do:"AI로 우리 제품 진단서 만들기"},
      {date:"2026-09-08", n:2, title:"어디서 싸울지부터 정합니다",
       tag:"시장 조사 · 경쟁 지도 · 포지셔닝",
       do:"AI로 경쟁 지도 그려 안 싸우고 이길 자리 찾기"},
      {date:"2026-09-14", n:3, title:"보고도 안 사는 이유",
       tag:"구매전환율을 올리는 심리 기술", do:"AI로 상세페이지·카피 다시 쓰기"},
      {date:"2026-09-15", n:4, title:"이제 데려옵니다",
       tag:"광고 실전 세팅", do:"AI로 키워드·광고문안 뽑아 바로 집행"}
    ],
    hours:20, capacity:17, enrolled:0,
    rating:null, ratingCount:0,
    reviews:[],
    detail:`
## 제품은 좋은데, 왜 안 팔릴까
그 이유를 찾아내고 **팔리게끔 바꾸는 20시간**입니다. 전 과정 AI 실습으로 진행합니다.

## 한눈에
| | |
| --- | --- |
| **일시** | 9월 7일(월) · 8일(화) · 14일(월) · 15일(화) |
| **시간** | 오후 1시 ~ 6시 · 하루 5시간 (총 20시간) |
| **장소** | 상지대학교 창업보육관 3층 라운지 |

## 회차별 커리큘럼
| 회차 | 날짜 | 교육 주제 | 그 시간에 만드는 것 |
| --- | --- | --- | --- |
| 01 | 9/7(월) | 우리 제품, 정말 시장에 맞습니까 — PMF 진단 | AI로 우리 제품 진단서 만들기 |
| 02 | 9/8(화) | 어디서 싸울지부터 정합니다 — 시장 조사·경쟁 지도·포지셔닝 | AI로 경쟁 지도 그려 안 싸우고 이길 자리 찾기 |
| 03 | 9/14(월) | 보고도 안 사는 이유 — 구매전환율을 올리는 심리 기술 | AI로 상세페이지·카피 다시 쓰기 |
| 04 | 9/15(화) | 이제 데려옵니다 — 광고 실전 세팅 | AI로 키워드·광고문안 뽑아 바로 집행 |

## 2회차는 정면승부만 다루지 않습니다
이기는 방법은 두 가지입니다. **더 잘하거나, 다른 자리에 서거나.**
큰 회사와 같은 기준으로 겨루면 대부분 집니다. 그래서 시장 크기와 경쟁사를 먼저 확인하고,
**겨루는 기준 자체를 바꿔** 경쟁 지도에서 아직 비어 있는 칸을 찾습니다.
그 자리를 우리 포지셔닝 문장 한 줄로 만들어 가지고 나가시게 됩니다.

## 이번 기수부터 달라지는 것
- 수업 자료와 워크시트를 **홈페이지 강의실**에서 씁니다
- 작성한 워크시트는 **PDF로 저장**되고, 강사만 열람합니다
- 수강 확정 후 **최초 1회만** 승인받으면 이후에는 로그인만 하면 됩니다

## 준비하실 것
- **노트북 지참**(필수) · 전 회차 실습형입니다
- **AI 도구 유료 구독**(필수) — Claude 또는 ChatGPT 유료 플랜
`
  },
  {
    id:"claude-mom", title:"전국 맘카페 매니저를 위한 클로드 코드", edition:"",
    status:"auto", kind:"invite",
    host:"전국 맘카페 매니저 대상",
    summary:"전국 맘카페 매니저 12분을 대상으로 진행하는 초청 교육입니다. "
        + "클로드 코드 입문부터 활용까지 다룹니다. 홈페이지에서 따로 신청받지 않습니다.",
    sessions:[
      {date:"2026-09-09", n:1, title:"클로드 코드 입문과 활용"}
    ],
    hours:4, capacity:null, enrolled:12,
    rating:null, ratingCount:0,
    reviews:[],
    detail:`
## 초청 교육입니다
전국 맘카페 매니저 **12분**을 대상으로 진행합니다. 홈페이지에서 신청받는 강의가 아니라,
요청을 받아 나가는 자리입니다.

## 무엇을 다루나
**클로드 코드(Claude Code) 입문부터 활용까지** 다룹니다.
설치와 기본 사용법에서 시작해, 카페 운영에 바로 쓸 수 있는 데까지 손으로 만들어 봅니다.

## 한눈에
| | |
| --- | --- |
| **일시** | 9월 9일(수) |
| **시간** | 오후 1시 ~ 5시 (4시간) |
| **인원** | 12명 |

## 단체 교육을 원하시면
모임·협회·기업 단위로 따로 요청하실 수 있습니다. 인원과 원하시는 주제를 알려주시면
일정을 맞춰 보겠습니다.
`
  },
  {
    id:"cc-1", title:"클로드 코드 마스터클래스", edition:"1기", status:"auto", paid:true,
    host:"스몰브랜드설계자 · 프라이빗 유료 과정 · 정원 10명",
    summary:"챗GPT 창에 묻고 답하는 단계를 넘어, 내 컴퓨터 안에서 내 브랜드를 이해하고 일하는 AI 를 4시간에 세팅합니다. "
        + "브랜드 코어 설계, 비주얼 프로덕션, 카카오톡 자동 보고까지 완성합니다. 정원 10명 · 수강료 10만 원.",
    summaryHtml:"챗GPT 창에 묻고 답하는 단계를 넘어, <br class=\"m\">내 컴퓨터 안에서 내 브랜드를 이해하고 <br class=\"m\">일하는 AI 를 4시간에 세팅합니다.<br class=\"pc\"> "
        + "<br class=\"m\">브랜드 코어 설계, 비주얼 프로덕션, <br class=\"m\">카카오톡 자동 보고까지 완성합니다. <br class=\"m\">정원 10명 · 수강료 10만&nbsp;원.",
    photos:[
      {src:"https://cdn.jsdelivr.net/gh/kjgqppr9-cmyk/sba-char-img@d1a12e9/cc1-voice1c.jpg", alt:"월 300만 원 정도 직원을 쓰는 듯한 느낌이에요 — 30대 후반 온라인 숍 사장님"},
      {src:"https://cdn.jsdelivr.net/gh/kjgqppr9-cmyk/sba-char-img@d1a12e9/cc1-voice2c.jpg", alt:"왜 작은 사업체 사장님들한테 클로드가 최고인지 알게 됐습니다 — 중년 남성 대표"},
      {src:"https://cdn.jsdelivr.net/gh/kjgqppr9-cmyk/sba-char-img@d1a12e9/cc1-voice3c.jpg", alt:"클로드로 부업해서 돈 벌었다는 게 이제 이해됩니다 — 30대 디자인 프리랜서"}
    ],
    apply:{from:"2026-09-08", to:"2026-09-17"},
    pitch:{
      kicker:"프라이빗 유료 과정 · 정원 10명<i class=\"pcd\"> · </i><br class=\"m\">수강료 10만&nbsp;원 · 노트북 지참",
      head:"대표를 위한<br>클로드 코드 마스터클래스",
      sub:"따라 하다 끝나는 강의가 아닙니다. <br class=\"m\"><b>내 브랜드를 아는 AI 참모</b>를 <br class=\"m\">내 노트북에 세팅해서 돌아갑니다"
    },
    info:{
      when:"9월 18일(금)",
      time:"오후 1시 ~ 5시 <em>(4시간)</em>",
      place:"상지대학교 창업보육센터<br> 3층 라운지"
    },
    prep:["노트북 지참", "Claude 유료 구독 <small>(Pro 이상)</small>"],
    note:"접수하신 분께는 <b>개별 연락</b>을 드리며, <br class=\"m\">수강료 결제 안내도 그때 드립니다.",
    sessions:[
      {date:"2026-09-18", n:1, title:"환경 구축부터 자동 보고까지, 네 개의 모듈",
       titleHtml:"환경 구축부터 자동 보고까지, <br class=\"m\">네 개의 모듈",
       tag:"환경 구축 · 브랜드 코어 설계 · 비주얼 프로덕션 · 카카오톡 자동 보고",
       tagHtml:"환경 구축 · 브랜드 코어 설계 <br class=\"m\">· 비주얼 프로덕션 · 카카오톡 자동 보고",
       do:"내 브랜드를 이해하는 AI 를 세팅하고, 카드뉴스 한 세트와 카톡 보고 비서까지 완성합니다",
       doHtml:"내 브랜드를 이해하는 AI 를 세팅하고, <br class=\"m\">카드뉴스 한 세트와 <br class=\"m\">카톡 보고 비서까지 완성합니다"}
    ],
    hours:4, capacity:10, enrolled:0,
    rating:null, ratingCount:0,
    reviews:[],
    detail:`
## 대표를 위한 클로드 코드 마스터클래스
챗GPT 창에 묻고 답하는 단계에서 한 발 더 나갑니다. **클로드 코드**는 내 컴퓨터 안에서 내 파일과 프로그램을 직접 다루는 AI 입니다.
이 과정의 목표는 하나입니다. 강의가 끝날 때 **내 브랜드를 이해하고, 내 방식대로 일하는 AI** 가 내 노트북 안에 세팅되어 있는 것.

## 한눈에
| | |
| --- | --- |
| **일시** | 9월 18일(금) 오후 1시 ~ 5시 (4시간) |
| **장소** | 상지대학교 창업보육센터 3층 라운지 |
| **정원** | 10명 · 소수 정예 |
| **수강료** | 10만 원 · 접수 후 개별 안내 |
| **준비물** | 노트북 · Claude 유료 구독(Pro 이상) |

## 4시간의 설계
| 시간 | 모듈 | 그 시간에 완성되는 것 |
| --- | --- | --- |
| 1시 | **환경 구축과 연결** — 설치 점검, 저장소(깃허브) 연결, 특강 「연결과 구조화」 | 내 노트북에서 클로드 코드가 돌아가고, 세상의 AI 스킬을 가져올 창고가 열립니다 |
| 2시 | **브랜드 코어 설계** — 우리 브랜드의 정체성·고객·말투를 AI 가 읽는 구조로 정리하고, 그동안 쓴 글로 말투를 학습시킵니다 | 설명하지 않아도 내 브랜드를 이미 아는 AI |
| 3시 | **비주얼 프로덕션** — 이미지를 만드는 세 가지 방식을 직접 비교하고, 디자인 원칙을 세워 최상의 조합으로 제작합니다 | 내 브랜드 톤으로 맞춘 카드뉴스 6장 세트 |
| 4시 | **자동화와 보고** — 카카오톡으로 나에게 보고하는 AI 비서를 만들고, 오늘의 결과를 저장소에 남깁니다 | 아침마다 카톡으로 보고를 받는 구조 |

## 왜 이 과정인가
- 프롬프트를 외우는 수업이 아닙니다. **AI 가 내 사업을 이해하는 구조**를 만듭니다. 구조는 도구가 바뀌어도, 직원이 바뀌어도 남습니다.
- 이미지 제작 세 가지 방식을 한자리에서 비교하고, **수정이 자유롭고 세트가 맞는 방식**을 내 것으로 가져갑니다.
- 정원 10명. 한 분 한 분의 노트북에서 끝까지 돌아가는 것을 확인하고 마칩니다.

## 이런 대표님께 맞습니다
- 챗GPT 는 써 봤지만 **내 브랜드와 내 일에 붙여서** 쓰고 싶은 분
- 클로드 코드를 설치하다 **막혀서 덮어 둔** 분
- 카드뉴스·공지·응대 글을 매번 처음부터 만드는 일에 지친 분
- AI 가 **나를 기억하고, 먼저 보고하게** 만들고 싶은 분

## 준비하실 것
- **노트북**(필수) · 전 과정 실습형입니다
- **Claude 유료 구독**(Pro 이상, 필수) — 강의 전에 결제해 두시면 첫 시간을 온전히 세팅에 쓸 수 있습니다
- 접수하신 분께는 **개별 연락**을 드리며, 결제 방법도 그때 안내드립니다
`
  },
  {
    id:"omni-2", title:"옴니채널 브랜딩 빌드업", edition:"2차", status:"auto",
    host:"상지대학교 창업보육센터",
    summary:"브랜드 메시지를 정리하고, AI로 카피 · 이미지 · 숏폼을 직접 만들어 흩어진 채널을 하나의 운영 체계로 묶습니다. 1차와 같은 커리큘럼으로 다시 엽니다.",
    apply:{from:"2026-09-28", to:"2026-10-07"},
    pitch:{
      kicker:"전 과정 AI 실습 · 입주기업 브랜딩 프로그램 · 총 10시간",
      head:"채널마다 다른 우리 브랜드,<br>하나로 묶습니다",
      sub:"말투 · 그림 · 영상이 <b>한 브랜드</b>로 보이게 만드는 네 번의 오후"
    },
    info:{
      when:"10월 13 · 15 · 20 · 22일<br class=\"pc\"> (화 · 목, 두 주)",
      time:"오후 3시 ~ 5시 30분 <em>(회차당 2시간 30분)</em>",
      place:"상지대학교 창업보육관<br class=\"pc\"> 3층 라운지"
    },
    prep:["노트북 지참", "AI 유료 구독 <small>(Claude 또는 ChatGPT)</small>"],
    note:"수료 후 <b>1:1 맞춤형 컨설팅</b>이 사업장 방문으로 이어집니다. 접수하신 분께는 <b>개별 연락</b>을 드립니다.",
    sessions:[
      {date:"2026-10-13", n:1, title:"브랜드 아이덴티티 및 옴니채널 전략 수립",
       tag:"브랜드 가이드", do:"우리 브랜드를 한 장의 정체성 문서로 정리합니다"},
      {date:"2026-10-15", n:2, title:"AI 카피라이팅 · SNS 콘텐츠 기획 및 AI 이미지 제작",
       tag:"콘텐츠 캘린더 · 채널별 운영안", do:"AI 로 채널별 카피와 이미지를 직접 뽑습니다"},
      {date:"2026-10-20", n:3, title:"AI 이미지 제작 심화 및 영상 · 숏폼 트렌드 시연",
       tag:"비주얼 제작안 · 숏폼 기획안", do:"브랜드 톤에 맞는 이미지와 숏폼 기획안을 만듭니다"},
      {date:"2026-10-22", n:4, title:"옴니채널 통합 운영 및 성과 분석",
       tag:"통합 운영안", do:"채널을 하나의 운영 체계로 묶고 성과 보는 법을 익힙니다"}
    ],
    hours:10, capacity:null, enrolled:0,
    rating:null, ratingCount:0,
    reviews:[],
    detail:`
## 이런 분을 위한 교육입니다
- 채널마다 **말투와 분위기가 제각각**인 사장님
- 만들 때마다 **매번 다른 그림**이 나와 답답한 사장님
- 만드는 법이 아니라 **교육 중에 실제 콘텐츠**를 뽑아 가고 싶은 사장님

## 회차별 커리큘럼
| 회차 | 날짜 | 교육 주제 | 손에 남는 것 |
| --- | --- | --- | --- |
| 1회 | 10/13(화) | 브랜드 아이덴티티 및 옴니채널 전략 수립 | 브랜드 가이드 |
| 2회 | 10/15(목) | AI 카피라이팅 · SNS 콘텐츠 기획 및 AI 이미지 제작 | 옴니채널 콘텐츠 캘린더 · 채널별 콘텐츠 운영안 |
| 3회 | 10/20(화) | AI 이미지 제작 심화 및 영상 · 숏폼 트렌드 시연 | 비주얼 콘텐츠 제작안 · 숏폼 콘텐츠 기획안 |
| 4회 | 10/22(목) | 옴니채널 통합 운영 및 성과 분석 | 옴니채널 통합 운영안 |

## 진행
- 모집 **9월 28일(월) ~ 10월 7일(수)** · 교육 **10월 13일(화) ~ 10월 22일(목)** · 15:00–17:30 (회차당 2시간 30분)
- 총 10시간 · 교육장 **상지대학교 창업보육관 3층 라운지**
- 전 회차 실습형 · 노트북과 AI 유료 구독(Claude 또는 ChatGPT)이 필요합니다

## 수료 후
- **1:1 맞춤형 컨설팅** · 사업장 방문 원칙 · 일정은 교육 종료 후 개별 안내
- 컨설팅 보고서는 실시일로부터 2주 이내 제공
`
  }
];

const APPLY_ANCHOR = "sba-apply";
const APPLY_FALLBACK = "/qna/form";
/* ══════════════════════════════════════════════════════════════ */

const ST = {
  upcoming:{label:"모집예정", cls:"st-upcoming"},
  open    :{label:"모집중",   cls:"st-open"},
  invite  :{label:"초청 강의", cls:"st-invite"},
  closed  :{label:"모집완료", cls:"st-closed"},
  running :{label:"강의중",   cls:"st-running"},
  done    :{label:"강의완료", cls:"st-done"}
};
const ORDER = ["open","running","invite","closed","upcoming","done"];
const WD = ["일","월","화","수","목","금","토"];
/* 주소 뒤에 ?d=2026-09-14 를 붙이면 그 날인 척 그린다. */
const TODAY = (function(){
  const s = (location.search.match(/[?&]d=(\d{4}-\d{2}-\d{2})/) || [])[1];
  const d = s ? new Date(+s.slice(0,4), +s.slice(5,7)-1, +s.slice(8,10)) : new Date();
  d.setHours(0,0,0,0);
  return d;
})();

const p2 = n => String(n).padStart(2,"0");
const ymd = d => d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());
const parse = s => { const [y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d); };
const fmt = s => { const d=parse(s); return (d.getMonth()+1)+"월 "+d.getDate()+"일"; };
const fmtw = s => fmt(s)+"("+WD[parse(s).getDay()]+")";
const days = (a,b) => Math.round((parse(b)-a)/86400000);
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const stars = r => "★".repeat(Math.round(r)) + "☆".repeat(5-Math.round(r));
const lecById = id => LECTURES.find(l=>l.id===id);

function autoStatus(l){
  const t = ymd(TODAY);
  const first = l.sessions[0], last = l.sessions[l.sessions.length-1];
  /* 초청 강의는 모집 단계가 없다. 끝나기 전까지 계속 '초청 강의'다. */
  if(l.kind === "invite") return (last && t > last.date) ? "done" : "invite";
  if(l.apply && t <  l.apply.from) return "upcoming";
  if(l.apply && t <= l.apply.to)   return "open";
  if(first   && t <  first.date)   return "closed";
  if(last    && t <= last.date)    return "running";
  if(last)                         return "done";
  return "upcoming";
}
LECTURES.forEach(l => { if(l.status === "auto") l.status = autoStatus(l); });

/* ══ 배경 신경망 ═════════════════════════════════════════════
   떠다니는 노드가 가까워지면 서로 이어지고, 망 전체가 물결을 탄다.
   초점 밖 빛망울(보케)이 뒤에 깔려 깊이를 만든다.
   세 섹션이 캔버스를 따로 쓰되 루프는 하나로 돌린다 — 보이는 것만 그린다.

   den 은 넓이당 노드 수(작을수록 촘촘), link 는 이어 주는 거리,
   k 는 진하기 배수다. 이 셋이 '성긴 별자리'와 '빽빽한 그물'을 가른다.

   ⚠ add 는 캔버스에 표시를 남겨 두 번 붙지 않는다. 블록이 화면에 붙는
   시점이 들쭉날쭉해서(떼었다 다시 붙기도 한다) 여러 번 불러도 안전해야 한다. */
const NET = (function(){
  const items = [];
  let raf = 0, last = 0;
  const rnd = (a,b) => a + Math.random() * (b - a);

  function build(it){
    if(it.mode === "grid"){ buildGrid(it); return; }
    const low = it.W < 760;
    it.LINK = low ? it.link * 0.72 : it.link;
    /* 밀도 2배. 다만 휴대폰은 상한을 낮게 둔다 — 선 긋는 비용이 제곱으로 는다 */
    const n = Math.max(22, Math.min(low ? 96 : 200, Math.round(it.W * it.H / it.den)));
    it.nodes = [];
    for(let i=0;i<n;i++){
      it.nodes.push({
        x: Math.random() * it.W, y: Math.random() * it.H,
        vx: rnd(-6,6), vy: rnd(-4,4),          /* 초당 px */
        r: rnd(1.0, 2.4),
        ph: Math.random() * Math.PI * 2,
        amp: rnd(4, 14),
        big: Math.random() < 0.16
      });
    }
    it.bokeh = [];
    const bn = low ? 3 : 6;
    for(let j=0;j<bn;j++){
      it.bokeh.push({
        x: Math.random() * it.W, y: Math.random() * it.H,
        r: rnd(Math.min(it.W, it.H) * 0.10, Math.min(it.W, it.H) * 0.26),
        vx: rnd(-3,3), vy: rnd(-2,2),
        a: rnd(0.04, 0.10) * it.k, ph: Math.random() * Math.PI * 2
      });
    }
  }

  /* ── 달력 섹션 전용 · 기하 격자 ──────────────────────────────
     히어로(떠오르는 보케)와 결이 겹치지 않도록 이쪽은 곡선을 쓰지 않는다.
     격자는 고정해 두고, 칸 몇 개만 날짜 채워지듯 잠깐 켜졌다 꺼진다. */
  function rrect(ctx, x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x+r, y);     ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);   ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);     ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
  }

  function buildGrid(it){
    const low = it.W < 760;
    /* 화면이 아주 넓으면 칸도 키운다 — 4K 에서 76px 격자는 잘아 보인다 */
    it.S = low ? 54 : (it.W > 2200 ? 96 : 76);
    it.cols = Math.ceil(it.W / it.S) + 2;
    it.rows = Math.ceil(it.H / it.S) + 2;
    /* 칸은 대부분 꺼져 있고 잠깐만 켜진다. 그래서 개수를 두 배로 잡아야
       한눈에 보이는 밀도가 비슷해진다. */
    const n = Math.max(6, Math.round(it.cols * it.rows * (low ? 0.10 : 0.085)));
    it.lit = [];
    for(let i=0;i<n;i++){
      it.lit.push({
        c: Math.floor(Math.random() * it.cols),
        r: Math.floor(Math.random() * it.rows),
        per: rnd(3.4, 8.5),        /* 한 번 떴다 지는 데 걸리는 시간(초) */
        duty: rnd(0.16, 0.34),     /* 그 중 켜져 있는 구간 — 0.25 면 4분의 1만 */
        off: Math.random(),        /* 시작 시점을 흩어 놓는다 */
        a: rnd(0.60, 1),
        ring: Math.random() < 0.3
      });
    }
  }

  function drawGrid(it, t){
    const ctx = it.ctx, S = it.S, k = it.k;
    ctx.clearRect(0, 0, it.W, it.H);
    /* 격자는 고정. 화면 폭에 맞춰 가운데로만 정렬한다 — 흐르면 산만하다. */
    const x0 = -S + ((it.W % S) / 2), y0 = -S + ((it.H % S) / 2);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,84,58,' + (0.095 * k).toFixed(3) + ')';
    ctx.beginPath();
    for(let i=0;i<=it.cols;i++){
      const x = Math.round(x0 + i*S) + 0.5;   /* .5 를 더해야 1px 선이 흐려지지 않는다 */
      ctx.moveTo(x, 0); ctx.lineTo(x, it.H);
    }
    for(let j=0;j<=it.rows;j++){
      const y = Math.round(y0 + j*S) + 0.5;
      ctx.moveTo(0, y); ctx.lineTo(it.W, y);
    }
    ctx.stroke();

    const pad = Math.max(3, S * 0.07), rad = Math.max(6, S * 0.16);
    for(const c of it.lit){
      /* 제 주기 안에서 duty 구간에만 켜진다. sin 반주기로 뜨고 지므로
         켜질 때도 꺼질 때도 뚝 끊기지 않는다. */
      const ph = ((t / c.per) + c.off) % 1;
      if(ph > c.duty) continue;
      const a = Math.pow(Math.sin((ph / c.duty) * Math.PI), 1.3) * c.a * k;
      const x = x0 + c.c * S, y = y0 + c.r * S;
      const g = ctx.createLinearGradient(x, y, x + S, y + S);
      g.addColorStop(0, 'rgba(46,196,140,' + (a * 0.16).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(0,148,96,'   + (a * 0.10).toFixed(3) + ')');
      ctx.fillStyle = g;
      rrect(ctx, x + pad, y + pad, S - pad*2, S - pad*2, rad);
      ctx.fill();
      if(c.ring){
        ctx.strokeStyle = 'rgba(0,148,96,' + (a * 0.22).toFixed(3) + ')';
        ctx.lineWidth = 1.2; ctx.stroke();
      }
    }

    /* 위아래 끝을 지운다 — 섹션 경계에서 격자가 뚝 잘리면 지저분하다 */
    const fade = ctx.createLinearGradient(0, 0, 0, it.H);
    fade.addColorStop(0,    'rgba(0,0,0,1)');
    fade.addColorStop(0.14, 'rgba(0,0,0,0)');
    fade.addColorStop(0.86, 'rgba(0,0,0,0)');
    fade.addColorStop(1,    'rgba(0,0,0,1)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, it.W, it.H);
    ctx.globalCompositeOperation = 'source-over';
  }

  /* 블록은 화면보다 좁게 놓인다. 좌우로 얼마나 더 뻗어야 화면 끝에 닿는지
     재서 --sba-bl / --sba-br 로 넘긴다. 100vw 를 쓰면 스크롤바 폭만큼 넘쳐
     가로 스크롤이 생기므로 documentElement.clientWidth 로 잰다.

     ⚠ 캔버스 폭을 '값을 넣은 뒤 다시 읽어서' 정하면 안 된다.
     그 변화가 캔버스를 보던 ResizeObserver 를 다시 부르고, 브라우저가
     그 되먹임을 끊어 버리면서 마지막 값이 반영되지 않는다(실제로 캔버스가
     1875 로 굳어 오른쪽에 경계선이 남았다).
     그래서 섹션만 재고 폭은 숫자로 직접 계산한다 — 왕복이 없다. */
  function metrics(it){
    const vw = document.documentElement.clientWidth || window.innerWidth || 0;
    const r = it.host.getBoundingClientRect();
    if(!vw || !r.width) return null;
    /* 폭은 '재서 더한 결과'가 아니라 화면 폭으로 못박는다.
       여백을 각각 재서 더하면 반올림 한 번에 어긋나 오른쪽에 선이 남는다.
       왼쪽 틈만 재고 오른쪽은 나머지로 정해 합이 반드시 화면 폭이 되게 한다.
       가운데 정렬은 가정하지 않는다 — 실제로 좌우가 안 맞는 테마가 있다. */
    const sw = Math.round(r.width);
    /* 덮어야 할 폭 = 화면 폭. 단 섹션이 화면보다 넓으면(가로 넘침이 있는 테마)
       섹션 폭을 쓴다 — 안 그러면 비트맵이 CSS 폭보다 작아 늘어난다. */
    const full = Math.max(vw, sw);
    const bl = Math.max(0, Math.min(Math.round(r.left), full - sw));
    const br = Math.max(0, full - sw - bl);
    return { bl: bl, br: br, w: full, h: Math.round(r.height) };
  }

  function resize(it){
    const m = metrics(it);
    if(!m) return false;
    /* 섹션에 걸어야 ::before 도 같은 값을 쓴다(캔버스는 물려받는다) */
    const st = it.host.style;
    st.setProperty("--sba-bl", m.bl + "px");
    st.setProperty("--sba-br", m.br + "px");
    const w = m.w, h = m.h;
    if(!w || !h) return false;
    if(w === it.W && h === it.H && it.cv.width) return true;   /* 달라진 게 없으면 그냥 둔다 */
    /* 4K 에서 dpr 2 를 그대로 쓰면 비트맵이 7680px 이 되어 메모리와 그리기가 급증한다.
       가로 4096 을 넘지 않게 배율을 낮춘다 — 배경이라 이 정도면 충분하다. */
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    if(w * dpr > 4096) dpr = Math.max(1, 4096 / w);
    it.W = w; it.H = h;
    it.cv.width  = Math.max(1, Math.round(w * dpr));
    it.cv.height = Math.max(1, Math.round(h * dpr));
    it.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build(it);
    draw(it, last, 0);
    return true;
  }

  function wrap(it, p){
    if(p.x < -80) p.x = it.W + 80; else if(p.x > it.W + 80) p.x = -80;
    if(p.y < -80) p.y = it.H + 80; else if(p.y > it.H + 80) p.y = -80;
  }

  function draw(it, t, dt){
    const ctx = it.ctx;
    if(!it.W || !it.H || !ctx) return;
    if(it.mode === "grid"){ drawGrid(it, t); return; }
    ctx.clearRect(0, 0, it.W, it.H);

    /* 섹션마다 시간이 따로 흐른다 — '모집 중'만 두 배 빠르게 간다.
       공용 t 를 그냥 곱하면 속도를 바꾸는 순간 위상이 튀므로 따로 쌓는다. */
    const sp = it.spd || 1;
    const T = (it.t += dt * sp), D = dt * sp;

    /* 1) 보케 — 초점이 나간 빛망울 */
    for(const o of it.bokeh){
      o.x += o.vx * D; o.y += o.vy * D; wrap(it, o);
      const pulse = 0.75 + 0.25 * Math.sin(T * 0.45 + o.ph);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0,    'rgba(46,196,140,' + (o.a * pulse).toFixed(3) + ')');
      g.addColorStop(0.55, 'rgba(0,148,96,'   + (o.a * pulse * 0.4).toFixed(3) + ')');
      g.addColorStop(1,    'rgba(0,148,96,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI*2); ctx.fill();
    }

    /* 2) 노드를 움직이고, 물결을 얹은 화면 좌표를 구한다.
          x 에 따라 위상이 달라지므로 망 전체가 옆으로 흐르는 물결이 된다. */
    for(const p of it.nodes){
      p.x += p.vx * D; p.y += p.vy * D; wrap(it, p);
      p.sx = p.x;
      p.sy = p.y + Math.sin(p.x / 250 + T * 0.38 + p.ph) * p.amp
                 + Math.sin(p.x / 100 - T * 0.24) * p.amp * 0.3;
    }

    /* 3) 선 — 가까울수록 진하게.
          밀도를 올리면 한 화면에 선이 1600개를 넘는다. 한 줄씩 stroke 하면
          색을 바꾸느라 느려지므로, 진하기를 8단으로 나눠 단마다 한 번씩 긋는다. */
    ctx.lineWidth = 1;
    const L = it.LINK, L2 = L * L, NB = 8;
    const seg = it.seg || (it.seg = []);
    for(let i=0;i<NB;i++){ if(!seg[i]) seg[i] = []; seg[i].length = 0; }
    for(let a=0;a<it.nodes.length;a++){
      for(let b=a+1;b<it.nodes.length;b++){
        const A = it.nodes[a], B = it.nodes[b];
        const dx = A.sx - B.sx, dy = A.sy - B.sy;
        const d2 = dx*dx + dy*dy;
        if(d2 > L2) continue;
        const w = 1 - Math.sqrt(d2) / L;
        let bi = (w * NB) | 0; if(bi >= NB) bi = NB - 1;
        seg[bi].push(A.sx, A.sy, B.sx, B.sy);
      }
    }
    for(let bi=0;bi<NB;bi++){
      const arr = seg[bi];
      if(!arr.length) continue;
      const w = (bi + 0.5) / NB;
      ctx.strokeStyle = 'rgba(0,84,58,' + (w * w * 0.26 * it.k).toFixed(3) + ')';
      ctx.beginPath();
      for(let i=0;i<arr.length;i+=4){ ctx.moveTo(arr[i], arr[i+1]); ctx.lineTo(arr[i+2], arr[i+3]); }
      ctx.stroke();
    }

    /* 4) 노드 — 큰 것은 흐릿한 보케처럼, 작은 것은 또렷하게 */
    for(const qn of it.nodes){
      const tw = 0.6 + 0.4 * Math.sin(T * 1.0 + qn.ph);
      if(qn.big){
        const bg = ctx.createRadialGradient(qn.sx, qn.sy, 0, qn.sx, qn.sy, qn.r * 9);
        bg.addColorStop(0, 'rgba(46,196,140,' + (0.26 * tw * it.k).toFixed(3) + ')');
        bg.addColorStop(1, 'rgba(46,196,140,0)');
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.arc(qn.sx, qn.sy, qn.r * 9, 0, Math.PI*2); ctx.fill();
      } else {
        const hg = ctx.createRadialGradient(qn.sx, qn.sy, 0, qn.sx, qn.sy, qn.r * 4.5);
        hg.addColorStop(0, 'rgba(0,148,96,' + (0.22 * tw * it.k).toFixed(3) + ')');
        hg.addColorStop(1, 'rgba(0,148,96,0)');
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(qn.sx, qn.sy, qn.r * 4.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(0,84,58,' + (0.44 * tw * it.k).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(qn.sx, qn.sy, qn.r, 0, Math.PI*2); ctx.fill();
      }
    }
  }

  function loop(now){
    raf = 0;
    const t = now / 1000;
    const dt = last ? Math.min(0.05, t - last) : 0.016;
    last = t;
    let any = false;
    for(const it of items){
      if(!it.on) continue;
      any = true;
      draw(it, t, dt);
    }
    if(any) raf = requestAnimationFrame(loop);
  }

  function kick(){ if(!raf){ last = 0; raf = requestAnimationFrame(loop); } }

  function add(host, cv, k, den, link, mode, spd){
    if(!host || !cv || cv.__sbaNet) return;      /* 이미 붙였으면 그냥 나간다 */
    const ctx = cv.getContext && cv.getContext('2d');
    if(!ctx) return;
    cv.__sbaNet = true;
    const it = { host, cv, ctx, W:0, H:0, k, den, link, mode: mode || "net",
                 spd: spd || 1, t: 0,
                 on:true, nodes:[], bokeh:[], lit:[], seg:[], LINK:link };
    items.push(it);
    resize(it);
    /* 붙는 순간엔 아직 자리가 안 잡혀 있을 수 있다. 몇 번 더 재 본다. */
    requestAnimationFrame(function(){ resize(it); });
    setTimeout(function(){ resize(it); }, 400);
    setTimeout(function(){ resize(it); kick(); }, 1600);
    /* 캔버스는 관찰하지 않는다 — 우리가 그 크기를 바꾸므로 되먹임이 된다.
       섹션 크기는 캔버스와 무관하게 정해지니 이쪽만 보면 안전하다. */
    if(window.ResizeObserver){
      new ResizeObserver(function(){ resize(it); }).observe(host);
    }
    /* 창 폭이 바뀌면 뻗는 양도 다시 계산해야 한다 */
    window.addEventListener('resize', function(){ resize(it); });
    /* 폰트·이미지가 늦게 들어오며 레이아웃이 또 바뀐다. load 이후 한 번 더 본다. */
    window.addEventListener('load', function(){ resize(it); setTimeout(function(){ resize(it); }, 600); });
    /* 화면 밖 섹션은 그리지 않는다 — 배터리와 발열을 아낀다 */
    if(window.IntersectionObserver){
      new IntersectionObserver(function(es){
        it.on = !!(es[0] && es[0].isIntersecting);
        if(it.on) kick();
      }, {threshold:0, rootMargin:"140px 0px"}).observe(host);
    }
    kick();
  }

  document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === 'visible') kick();
  });

  return { add };
})();

/* 캔버스를 찾아 신경망을 붙인다. 여러 번 불러도 안전하다(add 가 중복을 막는다).
   bm.container 가 아직 화면에 붙기 전일 수 있어 document 에서도 한 번 더 찾는다. */
function wireNet(){
  if(reduced()) return;
  const roots = [];
  const h = hostEl();
  if(h) roots.push(h);
  if(typeof document !== "undefined") roots.push(document);
  roots.forEach(function(root){
    root.querySelectorAll(".netfx").forEach(function(cv){
      const mode = cv.getAttribute("data-net");
      if(mode === "grid"){                       /* 달력 섹션 — 기하 격자 */
        NET.add(cv.parentElement, cv, 1.55, 0, 0, "grid");
        return;
      }
      /* 밀도는 2배(넓이당 3500). 대신 잇는 거리를 225 → 180 으로 줄인다.
         거리를 그대로 두면 선이 네 배로 늘어 그물처럼 뭉개진다.
         data-spd 가 붙은 섹션만 그 배수만큼 빠르게 흐른다. */
      const spd = parseFloat(cv.getAttribute("data-spd")) || 1;
      NET.add(cv.parentElement, cv, 1.6, 3500, 180, "net", spd);
    });
  });
}

/* ── ① 모집 중 ──
   남은 자리 수는 안 보여 준다. 초반에 '17석 중 17석 남음'이 뜨면
   아무도 신청 안 한 강의처럼 보여서 오히려 신청을 막는다. */
function curriculum(l){
  return '<ul class="cur">' + l.sessions.map(function(s){
    return '<li>'
      + '<span class="no">' + p2(s.n) + '</span>'
      + '<span class="ti">' + (s.titleHtml || esc(s.title))
      + (s.tag ? ' <em><span class="dash">— </span>' + (s.tagHtml || esc(s.tag)) + '</em>' : "") + '</span>'
      + '<span class="dt">' + fmtw(s.date) + '</span>'
      + (s.do ? '<span class="doit">' + (s.doHtml || esc(s.do)) + '</span>' : "")
      + '</li>';
  }).join("") + '</ul>';
}
/* 수강생 목소리 사진 — 4:5 세 장. PC 는 3열, 모바일은 옆으로 넘긴다(scroll-snap) */
function photoRow(l){
  if(!l.photos || !l.photos.length) return "";
  return '<div class="oc-photos" aria-label="수강생 목소리">' + l.photos.map(function(ph){
    return '<figure><img src="' + esc(ph.src) + '" alt="' + esc(ph.alt||"") + '" loading="lazy" decoding="async"></figure>';
  }).join("") + '</div>';
}
/* 일시·시간·장소 — 문구는 데이터에 그대로 적힌 대로 나간다(<br> 허용) */
const OI_ICON = {
  "일시": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M8 15h3M13 15h3" opacity=".55"/></svg>',
  "시간": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  "장소": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>'
};
function infoBox(l){
  if(!l.info) return "";
  const rows = [["일시", l.info.when], ["시간", l.info.time], ["장소", l.info.place]];
  return '<div class="oc-info">' + rows.filter(r => r[1]).map(function(r){
    return '<div class="oi"><span class="oi-ic" aria-hidden="true">' + (OI_ICON[r[0]]||"") + '</span>'
      + '<span class="oi-tx"><span class="oi-l">' + r[0] + '</span><span class="oi-v">' + r[1] + '</span></span></div>';
  }).join("") + '</div>';
}
/* 준비물 칩 + 안내 한 줄. prep 이 없으면 예전처럼 note 한 줄만 */
function prepBox(l){
  if(!l.prep || !l.prep.length) return l.note ? '<div class="oc-note">' + l.note + '</div>' : "";
  return '<div class="oc-prep">'
    + '<div class="op-h"><span class="op-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span>준비물</div>'
    + '<ul>' + l.prep.map(function(p){ return '<li>' + p + '</li>'; }).join("") + '</ul>'
    + (l.note ? '<p class="op-sub">' + l.note + '</p>' : "")
    + '</div>';
}

/* ── 클로드 코드 표기: 제목 속 '클로드 코드' 를 로고색(#D97757)으로, mark=true 면 앞에 클로드 공식 심볼을 붙인다 ── */
const CC_MARK = '<svg class="ccm" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fill-rule="nonzero"/></svg>';
function ccWrap(html, mark){ return String(html||"").replace(/클로드 코드/g, '<span class="cc">' + (mark ? CC_MARK : "") + '클로드 코드</span>'); }
function renderOpen(){
  const el = q("#openGrid");
  const open = LECTURES.filter(l=>l.status==="open");
  if(!open.length){
    const next = LECTURES.filter(l=>l.status==="upcoming")[0];
    el.innerHTML = `<div class="empty-card rv">
      <h3>지금은 모집 중인 강의가 없습니다</h3>
      <p>${next ? `다음은 <b>${esc(next.title)} ${esc(next.edition)}</b>입니다.<br>모집이 시작되면 알려드릴까요?`
                : "다음 모집이 정해지면 이 자리에 올라갑니다."}</p>
      <button class="btn" data-apply>모집 알림 신청하기 <i>↓</i></button></div>`;
    return;
  }
  el.innerHTML = open.map(l=>{
    const left = l.apply ? days(TODAY, l.apply.to) : -1;
    const first = l.sessions[0];
    const p = l.pitch;
    return `<div class="open-card rv">
      <div class="badge-row">
        <span class="st st-open">모집중</span>
        <span class="host">${esc(l.host)}</span>
        ${left>=0 ? `<span class="dday" style="margin-left:auto">마감 D-${left}</span>` : ""}
      </div>
      <h3>${ccWrap(esc(l.title))} <span style="color:var(--accent)">${esc(l.edition)}</span></h3>
      <div class="oc-sum">${l.summaryHtml || esc(l.summary)}</div>
      <div class="oc-facts">
        ${first?`<span>개강 <b>${fmtw(first.date)}</b></span>`:""}
        <span>총 <b>${l.sessions.length||"—"}회차 · ${l.hours}시간</b></span>
        ${l.apply?`<span>모집 <b>${fmtw(l.apply.from)} ~ ${fmtw(l.apply.to)}</b></span>`:""}
      </div>
      <div class="oc-pitch">
        ${p&&p.kicker?`<span class="oc-kick">${p.kicker}</span>`:""}
        ${p&&p.head?`<div class="oc-head">${ccWrap(p.head, true)}</div>`:""}
        ${p&&p.sub?`<div class="oc-subh">${p.sub}</div>`:""}
        ${curriculum(l)}
        ${photoRow(l)}
        ${infoBox(l)}
        ${prepBox(l)}
      </div>
      ${l.perk?`<div class="oc-perk"><span class="pk">수료 혜택</span><div class="pb">${l.perk}</div></div>`:""}
      <div class="oc-act">
        <button class="btn wide" data-apply>신청하기 <i>↓</i></button>
      </div></div>`;
  }).join("");
}

/* ── ② 강의 달력 ──
   보여 줄 달 = 오늘을 가운데 둔 앞뒤 두 달 ∪ 강의가 있는 달. */
const IDX = {};
LECTURES.forEach(l => l.sessions.forEach(s => {
  (IDX[s.date] = IDX[s.date] || []).push({lec:l, ses:s});
}));
const MONTHS = (function(){
  const set = {};
  for(let k=-2; k<=2; k++){
    const m = new Date(TODAY.getFullYear(), TODAY.getMonth()+k, 1);
    set[m.getFullYear()+"-"+p2(m.getMonth()+1)] = 1;
  }
  Object.keys(IDX).forEach(k => { set[k.slice(0,7)] = 1; });
  return Object.keys(set).sort();
})();
let calCur = -1, calPick = null;

function calInit(){
  if(calCur >= 0) return;
  calCur = MONTHS.indexOf(ymd(TODAY).slice(0,7));
  if(calCur === -1) calCur = 0;
}
/* 고른 날은 클래스만 바꾼다. 달력을 통째로 다시 그리면 깜빡이는 것처럼 보인다. */
function applyPick(){
  const host = hostEl(); if(!host) return;
  host.querySelectorAll(".cd").forEach(function(el){
    el.classList.toggle("pick", !!calPick && el.getAttribute("data-d") === calPick);
  });
  host.querySelectorAll(".mlist li").forEach(function(li){
    const k = li.getAttribute("data-k");
    li.classList.toggle("dim", !!calPick && k !== calPick);
    li.classList.toggle("lit", !!calPick && k === calPick);
  });
}
function renderSched(dir){
  if(!MONTHS.length) return;
  calInit();
  /* '다음 개강'은 신청할 수 있는 강의만 센다 — 초청 강의는 빼야 한다. */
  const up = LECTURES.filter(l => l.status !== "done" && l.kind !== "invite")
    .sort((a,b)=> a.sessions[0].date < b.sessions[0].date ? -1 : 1)[0];
  q("#schSub").innerHTML = up
    ? '색이 찍힌 날이 강의일입니다. <br class="m">다음 개강은 <b>' + fmtw(up.sessions[0].date) + '</b>입니다.'
    : '색이 찍힌 날이 강의일입니다. <br class="m">다음 일정이 정해지면 여기에 올라갑니다.';

  const [y, mo] = MONTHS[calCur].split("-").map(Number);
  q("#calTitle").innerHTML = '<span>'+y+'년</span>'+mo+'월';
  q(".prev").disabled = calCur === 0;
  q(".next").disabled = calCur === MONTHS.length - 1;

  q("#calJump").innerHTML = MONTHS.map(function(m, i){
    const a = m.split("-").map(Number);
    const k0 = Object.keys(IDX).filter(k => k.slice(0,7) === m)[0];
    const dot = k0
      ? '<i style="background:' + (IDX[k0][0].lec.status === "done" ? "#A9C7B8" : "var(--green)") + '"></i>'
      : "";
    return '<button class="jm'+(i===calCur?" on":"")+(k0?"":" empty")+'" data-j="'+i+'">'
         + a[1]+'월'+dot+'</button>';
  }).join("");

  const first = new Date(y, mo-1, 1).getDay(), last = new Date(y, mo, 0).getDate();
  let h = WD.map(w => '<i class="wd">'+w+'</i>').join("");
  for(let i=0;i<first;i++) h += '<button class="cd pad" tabindex="-1"></button>';
  for(let d=1; d<=last; d++){
    const k = y+"-"+p2(mo)+"-"+p2(d);
    const hit = IDX[k];
    const dow = (first + d - 1) % 7;
    const wk = dow===0 ? " sun" : dow===6 ? " sat" : "";
    const td = (k === ymd(TODAY)) ? " today" : "";
    const pk = (k === calPick) ? " pick" : "";
    /* 강의일은 테두리 없는 둥근 사각형으로 채운다. 상태가 곧 색이고,
       초청 강의는 그 위에 금색 점을 하나 더 단다. */
    const cls = hit
      ? " has d-" + hit[0].lec.status + (hit[0].lec.kind === "invite" ? " iv" : "") + (hit[0].lec.paid ? " pd" : "")
      : "";
    h += '<button class="cd'+cls+wk+td+pk+'"'
       + (hit ? ' data-d="'+k+'" aria-label="'+d+'일 '+esc(hit[0].lec.title)+'"' : ' tabindex="-1"')
       + '>'+d+'</button>';
  }
  const grid = q("#calGrid");
  grid.className = "calgrid" + (dir ? (dir > 0 ? " go-l" : " go-r") : "");
  grid.innerHTML = h;

  /* 그 달의 일정 — 누르지 않아도 보인다. 누르면 강의 상세가 열린다. */
  const inMonth = Object.keys(IDX).filter(k => k.slice(0,7) === MONTHS[calCur]).sort();
  q("#calList").innerHTML = '<h4>' + mo + '월 일정</h4>' + (inMonth.length
    ? '<ul>' + inMonth.map(function(k){
        return IDX[k].map(function(x){
          const dt = parse(k);
          const ed = x.lec.edition ? ' ' + esc(x.lec.edition) : "";
          return '<li data-k="'+k+'" data-open="'+x.lec.id+'" role="button" tabindex="0">'
            + '<span class="dd">'+dt.getDate()+'일<em>('+WD[dt.getDay()]+')</em></span>'
            + '<span class="bd"><span class="nm">'+(x.lec.paid ? '<i class="crown" aria-label="유료 강의"></i>' : '')+esc(x.lec.title)+ed
            + (x.lec.sessions.length > 1 ? '<i>'+x.ses.n+'회차</i>' : "") + '</span>'
            + '<span class="tt">'+esc(x.ses.title)+'</span></span>'
            + '<span class="st '+ST[x.lec.status].cls+'">'+ST[x.lec.status].label+'</span></li>';
        }).join("");
      }).join("") + '</ul>'
    : '<div class="none">이 달에는 강의가 없습니다.</div>');
  applyPick();
}
function calGo(step){
  const n = calCur + step;
  if(n < 0 || n >= MONTHS.length) return;
  calCur = n; calPick = null; renderSched(step);
}

/* ── ③ 리스트 ── */
let filter = "all";
const PAGE_SIZE = 5;
let expanded = false;
function headcount(l){
  if(!l.enrolled) return "";
  const word = (l.kind === "invite" && l.status !== "done") ? "대상" : "수강";
  return `<span>👥 <b>${l.enrolled}명</b> ${word}</span>`;
}
function renderList(){
  const f = q("#filters"), c = q("#cards");
  const counts = {}; LECTURES.forEach(l=>counts[l.status]=(counts[l.status]||0)+1);
  f.innerHTML = `<button class="chip${filter==="all"?" on":""}" data-f="all">전체<small>${LECTURES.length}</small></button>`
    + ORDER.filter(s=>counts[s]).map(s=>
        `<button class="chip${filter===s?" on":""}" data-f="${s}">${ST[s].label}<small>${counts[s]}</small></button>`).join("");
  const all = LECTURES.filter(l=>filter==="all"||l.status===filter)
    .sort((a,b)=>ORDER.indexOf(a.status)-ORDER.indexOf(b.status));
  const list = expanded ? all : all.slice(0, PAGE_SIZE);
  const more = q("#moreWrap");
  more.innerHTML = all.length > PAGE_SIZE
    ? (expanded ? `<button class="more" id="moreBtn">접기</button>`
                : `<button class="more" id="moreBtn">지난 강의 ${all.length-PAGE_SIZE}개 더 보기</button>`)
    : "";
  c.innerHTML = list.map(l=>{
    const first = l.sessions[0], lastS = l.sessions[l.sessions.length-1];
    const period = first ? (first===lastS ? fmtw(first.date)
                    : `${fmtw(first.date)} ~ ${fmtw(lastS.date)}`) : "일정 준비 중";
    return `<button class="lc rv b-${l.status}" data-open="${l.id}">
      <div class="lc-top">
        <span class="st ${ST[l.status].cls}">${ST[l.status].label}</span>
        <span class="host">${esc(l.host)}</span>
      </div>
      <h3>${ccWrap(esc(l.title))}${l.edition?` <span style="color:var(--accent)">${esc(l.edition)}</span>`:""}</h3>
      <div class="lc-sum">${esc(l.summary)}</div>
      <div class="lc-meta">
        <span>📅 ${period}</span>
        <span>⏱ ${l.hours}시간</span>
        ${headcount(l)}
        ${l.rating?`<span class="stars">${stars(l.rating)} <b style="color:var(--ink)">${l.rating.toFixed(1)}</b></span>`:""}
      </div></button>`;
  }).join("");
}

/* ── 마크다운 (필요한 문법만) ── */
function md(src){
  const lines = src.replace(/\r/g,"").split("\n");
  let out = [], i = 0;
  const inline = t => esc(t).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
  while(i < lines.length){
    const L = lines[i];
    if(/^\s*$/.test(L)){ i++; continue; }
    if(/^---\s*$/.test(L)){ out.push("<hr>"); i++; continue; }
    let m;
    if((m = L.match(/^###\s+(.*)/))){ out.push(`<h3>${inline(m[1])}</h3>`); i++; continue; }
    if((m = L.match(/^##\s+(.*)/))){  out.push(`<h2>${inline(m[1])}</h2>`); i++; continue; }
    if(/^\|/.test(L) && /^\|[\s:\-|]+\|$/.test(lines[i+1]||"")){
      const cell = r => r.trim().replace(/^\||\|$/g,"").split("|").map(s=>s.trim());
      const head = cell(L); i += 2;
      let body = [];
      while(i<lines.length && /^\|/.test(lines[i])){ body.push(cell(lines[i])); i++; }
      /* 머리글이 전부 비어 있으면 제목 줄을 그리지 않는다 — 2열 정보표용 */
      const bare = head.every(x => !x);
      out.push("<table>"
        + (bare ? "" : `<tr>${head.map(h=>`<th>${inline(h)}</th>`).join("")}</tr>`)
        + body.map(r=>`<tr>${r.map(d=>`<td>${inline(d)}</td>`).join("")}</tr>`).join("") + "</table>");
      continue;
    }
    if(/^[-*]\s+/.test(L)){
      let items = [];
      while(i<lines.length && /^[-*]\s+/.test(lines[i])){ items.push(inline(lines[i].replace(/^[-*]\s+/,""))); i++; }
      out.push(`<ul>${items.map(t=>`<li>${t}</li>`).join("")}</ul>`);
      continue;
    }
    out.push(`<p>${inline(L)}</p>`); i++;
  }
  return out.join("");
}

/* ── 상세 오버레이 ── */
function openLec(id, push){
  const l = lecById(id); if(!l) return;
  const first = l.sessions[0], lastS = l.sessions[l.sessions.length-1];
  const period = first ? (first===lastS ? fmtw(first.date) : `${fmtw(first.date)} ~ ${fmtw(lastS.date)}`) : "준비 중";
  const canApply = l.status==="open";
  const headLabel = (l.kind === "invite" && l.status !== "done") ? "대상 인원" : "수강 인원";
  const rv = l.reviews && l.reviews.length ? `
    <div class="rv-head">
      <div><div class="rv-score">${l.rating.toFixed(1)}</div>
        <div class="stars">${stars(l.rating)}</div></div>
      <div class="rv-note">수료생 <b>${l.enrolled}명</b> 중 <b>${l.respondents}명</b>이 답한 만족도 조사 결과입니다.<br>
        아래는 실제로 받은 답변이며, <b>오타와 말투만 다듬었습니다.</b></div>
    </div>
    ${l.reviews.map(r=>`<div class="rvw"><div class="rv-q">"${esc(r.q)}"</div>
      <div class="rv-w">— ${esc(r.who)}</div></div>`).join("")}
    <div class="rv-src">※ 응답자 보호를 위해 업체명과 성함 대신 <b>업종과 직책</b>으로 표기했습니다.</div>` : "";

  q("#ovBox").innerHTML = `
    <div class="ov-hd">
      <button class="ov-x" data-close aria-label="닫기">✕</button>
      <div class="lc-top" style="margin:0">
        <span class="st ${ST[l.status].cls}">${ST[l.status].label}</span>
        <span class="host">${esc(l.host)}</span>
      </div>
      <h3>${ccWrap(esc(l.title))}${l.edition?` <span style="color:var(--accent)">${esc(l.edition)}</span>`:""}</h3>
    </div>
    <div class="ov-bd">
      <div class="ov-facts">
        <dl class="ovf"><dt>교육 일정</dt><dd>${period}</dd></dl>
        <dl class="ovf"><dt>총 시간</dt><dd>${l.sessions.length||"—"}회차 · ${l.hours}시간</dd></dl>
        ${l.apply ? `<dl class="ovf"><dt>모집 기간</dt><dd style="font-size:14px">${fmtw(l.apply.from)} ~ ${fmtw(l.apply.to)}</dd></dl>` : ""}
        ${l.capacity ? `<dl class="ovf"><dt>정원</dt><dd>${l.capacity}명${l.enrolled?` <span style="font-size:13px;color:var(--ink2)">(수강 ${l.enrolled})</span>`:""}</dd></dl>`
                     : (l.enrolled ? `<dl class="ovf"><dt>${headLabel}</dt><dd>${l.enrolled}명</dd></dl>` : "")}
      </div>
      ${l.sessions.length>1 ? `<div class="ov-facts" style="grid-template-columns:1fr">
        <dl class="ovf"><dt>회차별 일정</dt><dd style="font-size:14.5px;font-weight:600;line-height:1.9">${
          l.sessions.map(s=>`${s.n}회차 · ${fmtw(s.date)} — ${esc(s.title)}`).join("<br>")}</dd></dl></div>` : ""}
      <div class="md">${md(l.detail)}</div>
      ${rv}
      ${canApply ? `<div style="margin-top:26px;display:flex;justify-content:flex-end">
        <button class="btn" data-apply>신청하기 <i>↓</i></button></div>` : ""}
    </div>`;
  q("#ov").classList.add("on");
  document.body.style.overflow = "hidden";
  if(push !== false) history.replaceState(null,"","#lecture-"+id);
}
function closeLec(){
  q("#ov").classList.remove("on");
  document.body.style.overflow = "";
  history.replaceState(null,"",location.pathname+location.search);
}

/* ── 이벤트 ── */
function onClick(e){
  if(e.target.closest("[data-apply]")){
    closeLec();
    const form = document.querySelector("#" + APPLY_ANCHOR);
    if(form) form.scrollIntoView({behavior:"smooth",block:"start"});
    else location.href = APPLY_FALLBACK;
    return;
  }
  const j = e.target.closest("[data-j]");
  if(j){
    const n = +j.getAttribute("data-j");
    const step = n - calCur;
    calCur = n; calPick = null; renderSched(step);
    return;
  }
  if(e.target.closest(".prev")){ calGo(-1); return; }
  if(e.target.closest(".next")){ calGo(1); return; }
  const d = e.target.closest(".cd.has");
  if(d){
    const k = d.getAttribute("data-d");
    calPick = (calPick === k) ? null : k;
    applyPick();          /* 다시 그리지 않는다 — 클래스만 바꾼다 */
    return;
  }
  const o = e.target.closest("[data-open]");
  if(o){ openLec(o.getAttribute("data-open")); return; }
  const f = e.target.closest("[data-f]");
  if(f){ filter = f.getAttribute("data-f"); expanded = false; renderList(); reveal(); return; }
  if(e.target.closest("#moreBtn")){
    expanded = !expanded; renderList(); reveal();
    if(!expanded) q("#cards").scrollIntoView({behavior:"smooth",block:"start"});
    return;
  }
  if(e.target.closest("[data-close]") || e.target.id === "ov"){ closeLec(); }
}
/* 일정 목록 항목은 li 라 기본 키보드 동작이 없다. 직접 붙여 준다. */
function onKey(e){
  if(e.key !== "Enter" && e.key !== " ") return;
  const t = e.target.closest(".mlist li,[data-apply]");
  if(!t) return;
  e.preventDefault();
  t.click();
}
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeLec(); });

/* 모바일에서 좌우로 밀어 달 넘기기.
   세로로 더 많이 움직였으면 페이지 스크롤이므로 건드리지 않는다. */
let tx = null, ty = null;
function onTouchStart(e){
  if(!e.target.closest(".calwrap")){ tx = null; return; }
  tx = e.touches[0].clientX; ty = e.touches[0].clientY;
}
function onTouchEnd(e){
  if(tx === null) return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  if(Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.5) calGo(dx < 0 ? 1 : -1);
  tx = ty = null;
}

/* ── 스크롤 등장 ── */
let io = null;
function reduced(){
  try{ return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; }
}
function reveal(){
  const host = hostEl(); if(!host) return;
  if(io){ try{ io.disconnect(); }catch(e){} io = null; }
  const items = host.querySelectorAll(".rv");
  if(reduced() || !("IntersectionObserver" in window)){
    items.forEach(el => el.classList.add("in"));
    return;
  }
  io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      const el = en.target;
      const sibs = el.parentElement ? [].slice.call(el.parentElement.children) : [];
      const i = Math.min(sibs.indexOf(el), 6);
      el.style.transitionDelay = (i > 0 ? i * 0.07 : 0) + "s";
      el.classList.add("in");
      io.unobserve(el);
    });
  }, {threshold:.06, rootMargin:"0px 0px -6% 0px"});
  items.forEach(el => io.observe(el));
}

/* ── 시작 ── */
let boundNode = null, hashOpened = false;
function boot(){
  const host = hostEl();
  if(!host || !host.querySelector("#openGrid")) return false;
  if(boundNode !== host){
    host.addEventListener("click", onClick, true);
    host.addEventListener("keydown", onKey, true);
    host.addEventListener("touchstart", onTouchStart, {passive:true});
    host.addEventListener("touchend", onTouchEnd, {passive:true});
    boundNode = host;
  }
  renderOpen(); renderSched(0); renderList();
  reveal();
  /* 신경망은 guard 밖에서 매번 확인한다 — 블록이 붙는 시점이 들쭉날쭉하다 */
  wireNet();
  if(!hashOpened){
    hashOpened = true;
    const h = (location.hash||"").match(/^#lecture-(.+)$/);
    if(h) openLec(h[1], false);
  }
  return true;
}
if(!boot()){
  let tries = 0;
  const timer = setInterval(()=>{ if(boot() || ++tries > 200) clearInterval(timer); }, 50);
}
/* 늦게 붙는 경우를 대비한 안전망 */
setTimeout(wireNet, 800);
setTimeout(wireNet, 2500);
if(typeof bm !== "undefined") bm.onContextChange = function(){ boot(); };
};
