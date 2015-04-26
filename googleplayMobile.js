document.addEventListener("DOMContentLoaded", function() {
	document.body.addEventListener('touchstart', onStart, false);
	document.body.addEventListener('touchend', onEnd, false);

	var oEl = initVar({
	  elTemplate : 'addBooksTemplates',
	  elBookList : 'contentList'
	});

	function initVar(oEl) {
	  for(var el in oEl) {
	    oEl[el] = document.getElementsByClassName(oEl[el])[0];
	  }
	  return oEl;
	}

  	var isStartEvent = false; //touchstart 이벤트 발생 여부
  	var nMoveType = -1;      //현재 판단된 사용자 움직임의 방향
  	var nCount = 5;          //현재 보여지는 책의 index (시작: 5, 범위: 1~10)
  	var oTouchInfo = {       //touchstart 시점의 좌표와 시간을 저장하기
  	    nStartX : -1,
  	    nStartY : -1,
  	};

  	//수평 방향을 판단하는 기준 기울기
  	var nHSlope = ((window.innerHeight/2) / window.innerWidth).toFixed(2) * 1;
  	  
  	function initTouchInfo() { //터치 정보들의 값을 초기화하는 함수
  	    oTouchInfo.nStartX = -1;
  	    oTouchInfo.nStartY = -1;
  	}
  	  
  	function onStart(e) {
  		if (e.touches.length === 1) {
	  	    //touchstart 이벤트 시점에 정보를 갱신한다.
	  	    oTouchInfo.nStartX = e.changedTouches[0].clientX;
	  	    oTouchInfo.nStartY = e.changedTouches[0].clientY;
	  	    isStartEvent = true;
	  	}
  	}
  	  
  	function onEnd(e) {
  	    if(!isStartEvent) {
  	        return
  	    }
  	  
        var nX = e.changedTouches[0].clientX;
        var nY = e.changedTouches[0].clientY;
        nMoveType = getMoveType(nX, nY);
        nDirectionType = getDirectionType(nX);

  	    if(nMoveType === 0) {
  	    	if(nDirectionType === 1) {
  	    		nCount++;
  	    		if (nCount > 10) { 
  	    			nCount = 10;
  	    			return }
  	        }

  	        else if(nDirectionType === 0) {
  	        	nCount--;
  	        	if (nCount < 1) { 
  	        		nCount = 1;
  	        		return }
  	        }

  	        var bookElement = "";
  	        var sTemplate = oEl.elTemplate.innerText;
  	        oBookList[nCount].forEach(function(value) {
  	          var result = sTemplate.replace('<%=Name%>', value.Name).replace('<%=Name%>', value.Name).replace('<%=Name%>', value.Name).replace('<%=ImageLink%>', value.ImageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=Writer%>', value.Writer).replace('<%=Writer%>', value.Writer).replace('<%=WriterLink%>', value.WriterLink).replace('<%=Price%>', value.Price);
  	          bookElement += result;
  	        });
  	        oEl.elBookList.innerHTML = bookElement;
  	    }

  	    isStartEvent = false;
  	    nMoveType = -1;       //수평/수직 여부 초기화
  	    nDirectionType = -1;  //움직임의 방향 초기화
  	    initTouchInfo();      //터치 정보를 초기화
  	}

  	//touchstart 좌표값과 비교하여 현재 사용자의 움직임을 판단하는 함수
  	function getMoveType(x, y) {
  	    //0은 수평방향, 1은 수직방향, -1은 이동 없음
  	    var nMoveType = -1;
  	      
  	    var nX = Math.abs(oTouchInfo.nStartX - x);
  	    var nY = Math.abs(oTouchInfo.nStartY - y);
  	    var nDis = nX + nY;
  	    
  	    //현재 움직인 거리가 기준 거리(25px) 보다 작을 땐 방향을 판단하지 않는다.
  	    if(nDis < 25) { return nMoveType }
  	      
  	    var nSlope = parseFloat((nY / nX).toFixed(2), 10);

  	    if(nSlope > nHSlope) {
  	        nMoveType = 1;
  	    } else {
  	        nMoveType = 0;
  	    }
  	      
  	    return nMoveType;
  	}

  	//touchstart 좌표값과 비교하여 현재 사용자의 움직임 방향을 판단하는 함
  	  function getDirectionType(x) {
  	    // 1은 오른쪽에서 왼쪽 이동, 0은 왼쪽에서 오른쪽 이동, -1은 에러
  	    var nDirectionType = -1;
  	      
  	    var nX = oTouchInfo.nStartX - x;

  	    if(nX > 0) {
  	        nDirectionType = 0;
  	    } else if(nX < 0) {
  	        nDirectionType = 1;
  	    }
  	      
  	    return nDirectionType;
  	}

  	var oBookList = {
	  "1" : [
	    {
	      "Name" : "게으름뱅이 탈출학교: 시간의 소중함을 모르는 아이들을 위한 시간관리의 지혜 (어린이 자기계발학교 1)",
	      "ImageLink": "https://encrypted.google.com/books/images/frontcover/q9sZBAAAQBAJ?fife=w340-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%ED%99%A9%EA%B7%BC%EA%B8%B0_%EA%B2%8C%EC%9C%BC%EB%A6%84%EB%B1%85%EC%9D%B4_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=q9sZBAAAQBAJ",
	      "Writer": "황근기",
	      "WriterLink": "https://play.google.com/store/books/author?id=%ED%99%A9%EA%B7%BC%EA%B8%B0",
	      "Price": "6,000"
	    },
	    {
	      "Name" : "초등고민 탈출학교: 초등학생이 가장 고민하는 30가지 심리문제에 답하는 책 (어린이 자기계발학교 5)",
	      "ImageLink": "https://encrypted.google.com/books/images/frontcover/3as9BAAAQBAJ?fife=w340-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%9D%B4%EB%AF%BC%EC%8B%9D_%EC%B4%88%EB%93%B1%EA%B3%A0%EB%AF%BC_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=3as9BAAAQBAJ",
	      "Writer": "이민식",
	      "WriterLink": "https://play.google.com/store/books/author?id=%EC%9D%B4%EB%AF%BC%EC%8B%9D",
	      "Price": "6,000"
	    }
	  ],
	  "2" : [
	    {
	      "Name" : "다이어트 마스터",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/dgQ-BAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EA%B9%80%EC%A7%80%ED%9B%88_%EB…%A4%EC%9D%B4%EC%96%B4%ED%8A%B8_%EB%A7%88%EC%8A%A4%ED%84%B0?id=dgQ-BAAAQBAJ",
	      "Writer" : "김지훈",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EA%B9%80%EC%A7%80%ED%9B%88",
	      "Price" : "8,000"
	    },
	    {
	      "Name" : "새해, 금연 & 금주에 성공하는 기술",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/l4DYLxE6jhsC?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%ED%97%AC%EC%8A%A4%EC%A1%B0%EC%…90_%EC%84%B1%EA%B3%B5%ED%95%98%EB%8A%94_%EA%B8%B0%EC%88%A0?id=l4DYLxE6jhsC",
	      "Writer" : "헬스조선 편집팀",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%ED%97%AC%EC%8A%A4%EC%A1%B0%EC%84%A0+%ED%8E%B8%EC%A7%91%ED%8C%80",
	      "Price" : "2,500"
	    }
	  ],
	  "3" : [
	    {
	      "Name" : "10년 전을 사는 여자, 10년 후를 사는 여자",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/0Zs5BAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%95%84%EB%A6%AC%EC%B9%B4%EC%…4_%ED%9B%84%EB%A5%BC_%EC%82%AC%EB%8A%94_%EC%97%AC%EC%9E%90?id=0Zs5BAAAQBAJ",
	      "Writer" : "아리카와 마유미",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%95%84%EB%A6%AC%EC%B9%B4%EC%99%80+%EB%A7%88%EC%9C%A0%EB%AF%B8",
	      "Price" : "10,800"
	    },
	    {
	      "Name" : "거의 모든 것의 정리법",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/q8wUBAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%A0%80%EC%8A%A4%ED%8B%B4_%ED…A8%EB%93%A0_%EA%B2%83%EC%9D%98_%EC%A0%95%EB%A6%AC%EB%B2%95?id=q8wUBAAAQBAJ",
	      "Writer" : "저스틴 클로스키",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%A0%80%EC%8A%A4%ED%8B%B4+%ED%81%B4%EB%A1%9C%EC%8A%A4%ED%82%A4",
	      "Price" : "12,000"
	    }
	  ],
	  "4" : [
	    {
	      "Name" : "노벨상과 수리공 : 과학을 뛰어넘은 엔지니어링 이야기",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/Ne6pAwAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EA%B6%8C%EC%98%A4%EC%83%81_%EB…%80%EB%8B%88%EC%96%B4%EB%A7%81_%EC%9D%B4%EC%95%BC%EA%B8%B0?id=Ne6pAwAAQBAJ",
	      "Writer" : "권오상",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EA%B6%8C%EC%98%A4%EC%83%81",
	      "Price" : "8,800"
	    },
	    {
	      "Name" : "에포컬 모멘텀: 한국 과학사의 획기적인 순간들",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/H5_bAwAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%ED%95%9C%EB%8F%84%ED%98%84_%EC%97%90%ED%8F%AC%EC%BB%AC_%EB%AA%A8%EB%A9%98%ED%85%80?id=H5_bAwAAQBAJ",
	      "Writer" : "한도현",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%ED%95%9C%EB%8F%84%ED%98%84",
	      "Price" : "9,100"
	    }
	  ],
	  "5" : [
	    {
	      "Name" : "다이어트 비밀 43가지",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/m_IxAgAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%9D%B4%EC%A4%80%EC%88%99_%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8_%EB%B9%84%EB%B0%80_43%EA%B0%80%EC%A7%80?id=m_IxAgAAQBAJ",
	      "Writer" : "이준숙",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%9D%B4%EC%A4%80%EC%88%99",
	      "Price" : "5,500"
	    },
	    {
	      "Name" : "젊은 베르테르의 슬픔 (한글판)",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/w5ovsKXL0IQC?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%9A%94%ED%95%9C_%EB%B3%BC%ED%94%84%EA%B0%95_%ED%8F%B0_%EA%B4%B4%ED%85%8C_%EC%A0%8A%EC%9D%80_%EB%B2%A0%EB%A5%B4%ED%85%8C%EB%A5%B4%EC%9D%98_%EC%8A%AC%ED%94%94_%ED%95%9C%EA%B8%80%ED%8C%90?id=w5ovsKXL0IQC",
	      "Writer" : "요한 볼프강 폰 괴테",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%9A%94%ED%95%9C+%EB%B3%BC%ED%94%84%EA%B0%95+%ED%8F%B0+%EA%B4%B4%ED%85%8C",
	      "Price" : "1,500"
	    }
	  ],
	  "6" : [
	    {
	      "Name" : "상실의 시간들",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/fRk8BAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%B5%9C%EC%A7%80%EC%9B%94_%EC%83%81%EC%8B%A4%EC%9D%98_%EC%8B%9C%EA%B0%84%EB%93%A4?id=fRk8BAAAQBAJ",
	      "Writer" : "최지월",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%B5%9C%EC%A7%80%EC%9B%94",
	      "Price" : "7,800"
	    },
	    {
	      "Name" : "아서왕과 원탁의 기사들",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/GCk4BAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%ED%86%A0%EB%A8%B8%EC%8A%A4_%EB…BC_%EC%9B%90%ED%83%81%EC%9D%98_%EA%B8%B0%EC%82%AC%EB%93%A4?id=GCk4BAAAQBAJ",
	      "Writer" : "토머스 불핀치",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%ED%86%A0%EB%A8%B8%EC%8A%A4+%EB%B6%88%ED%95%80%EC%B9%98",
	      "Price" : "3,000"
	    }
	  ],
	  "7" : [
	    {
	      "Name" : "아기돼지 삼형제",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/dmjDae-Zo6sC?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%98%81%EA%B5%AD_%EB%AF%BC%ED…%84%EA%B8%B0%EB%8F%BC%EC%A7%80_%EC%82%BC%ED%98%95%EC%A0%9C?id=dmjDae-Zo6sC",
	      "Writer" : "영국 민화",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%98%81%EA%B5%AD+%EB%AF%BC%ED%99%94",
	      "Price" : "2,900"
	    },
	    {
	      "Name" : "브레멘의 음악대",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/fJ2Ddyo1qg4C?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EA%B7%B8%EB%A6%BC_%ED%98%95%EC…%8C%EB%A0%88%EB%A9%98%EC%9D%98_%EC%9D%8C%EC%95%85%EB%8C%80?id=fJ2Ddyo1qg4C",
	      "Writer" : "그림 형제",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EA%B7%B8%EB%A6%BC+%ED%98%95%EC%A0%9C",
	      "Price" : "2,900"
	    }
	  ],
	  "8" : [
	    {
	      "Name" : "관능의 맛, 파리: 문화와 역사가 담긴 프랑스 요리에 탐닉하다",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/P1Q-BAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EB%AF%BC%ED%98%9C%EB%A0%A8_%EA%B4%80%EB%8A%A5%EC%9D%98_%EB%A7%9B_%ED%8C%8C%EB%A6%AC?id=P1Q-BAAAQBAJ",
	      "Writer" : "민혜련",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EB%AF%BC%ED%98%9C%EB%A0%A8",
	      "Price" : "12,000"
	    },
	    {
	      "Name" : "놀자! 강릉에서!: 삶이 무료할 때, 어디론가 떠나고 싶을 때 바람 따라 길 따라 떠나는 강릉 여행!",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/neY7BAAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%A0%84%EC%B0%AC%ED%98%B8_%EB%86%80%EC%9E%90_%EA%B0%95%EB%A6%89%EC%97%90%EC%84%9C?id=neY7BAAAQBAJ",
	      "Writer" : "전찬호",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%A0%84%EC%B0%AC%ED%98%B8",
	      "Price" : "7,200"
	    }
	  ],
	  "9" : [
	    {
	      "Name" : "류성룡, 나라를 다시 만들 때가 되었나이다",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/_B7RAwAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EC%86%A1%EB%B3%B5_%EB%A5%98%EC…%8C%EA%B0%80_%EB%90%98%EC%97%88%EB%82%98%EC%9D%B4%EB%8B%A4?id=_B7RAwAAQBAJ",
	      "Writer" : "송복",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EC%86%A1%EB%B3%B5",
	      "Price" : "11,900"
	    },
	    {
	      "Name" : "기업의 시대: 기업은 인류의 운명을 어떻게 바꿨는가?",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/7_iDAwAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/CCTV_%EB%8B%A4%ED%81%90_%EC%A0%…91%ED%8C%80_%EA%B8%B0%EC%97%85%EC%9D%98_%EC%8B%9C%EB%8C%80?id=7_iDAwAAQBAJ",
	      "Writer" : "CCTV 다큐 제작팀",
	      "WriterLink" : "https://play.google.com/store/books/author?id=CCTV+%EB%8B%A4%ED%81%90+%EC%A0%9C%EC%9E%91%ED%8C%80",
	      "Price" : "11,000"
	    }
	  ],
	  "10" : [
	    {
	      "Name" : "디자이너’s PRO 디자인 공모전: 디자이너가 디자이너에게 선물하는",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/0f1jAwAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EA%B9%80%EB%8F%84%EC%98%81_%EB…RO_%EB%94%94%EC%9E%90%EC%9D%B8_%EA%B3%B5%EB%AA%A8%EC%A0%84?id=0f1jAwAAQBAJ",
	      "Writer" : "김도영",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EA%B9%80%EB%8F%84%EC%98%81",
	      "Price" : "18,200"
	    },
	    {
	      "Name" : "좋아 보이는 것들의 비밀, illustration: 강력한 메시지를 전달하는 일러스트레이션에는 어떤 비밀이 있을까?",
	      "ImageLink" : "https://encrypted.google.com/books/images/frontcover/i10lAwAAQBAJ?fife=w170-rw",
	      "PageLink" : "https://play.google.com/store/books/details/%EB%AC%B8%EC%88%98%EB%AF%BC_%EC…EA%B2%83%EB%93%A4%EC%9D%98_%EB%B9%84%EB%B0%80_illustration?id=i10lAwAAQBAJ",
	      "Writer" : "문수민",
	      "WriterLink" : "https://play.google.com/store/books/author?id=%EB%AC%B8%EC%88%98%EB%AF%BC",
	      "Price" : "18,200"
	    }
	  ]
	}
  });