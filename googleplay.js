document.addEventListener("DOMContentLoaded", function() {
  
  /* 주요 변수 초기화 */

  var oEl = initVar({
    elActionBar : 'actionBarDropdown',
    elButton : 'button_Genre',
    elSpanButton : 'span_GenreIcon',
    elSpanMore : 'span_SectionMore 1',
    elSpanHeader : 'span_SectionHeader',
    elBooks : 'section_Books',
    elSubmenuWrapper : 'ul_submenuItemWrapper',
    elSpanHeader : 'span_SectionHeader',
    elSpanSubtile : 'span_SectionSubtitle',
    elOverlay : 'mainLoadingOverlay',
    elApps : 'span_Apps',
    elDivApps : 'headerRight_Right_Apps_Cover',
    elDivAppsEdgeCover: 'headerRight_Right_AppsEdgeTop',
    elDivAppsEdge : 'headerRight_Right_AppsEdgeBottom',
    elTemplate : 'addBooksTemplates',
    elUlApps : 'ul_Apps'
  });

  function initVar(oEl) {
    for(var el in oEl) {
      oEl[el] = document.getElementsByClassName(oEl[el])[0];
    }
    return oEl;
  }

  var oLiList = {
    "LIST1" : "가족 / 관계",
    "LIST2" : "건강 / 웰빙",
    "LIST3" : "경영 / 경제",
    "LIST4" : "과학 / 수학",
    "LIST5" : "만화",
    "LIST6" : "소설 / 문학",
    "LIST7" : "어린이",
    "LIST8" : "여행",
    "LIST9" : "역사",
    "LIST10" : "예술과 디자인",
    "LIST11" : "외국어 / 교재",
    "LIST12" : "요리 / 음료",
    "LIST13" : "인물 / 자서전",
    "LIST14" : "정치 / 사회",
    "LIST15" : "종교",
    "LIST16" : "컴퓨터 / 기술"
  }

  var oCategoryName = {
    "주간 베스트셀러" : "span_LeafSubmenuLink LIST0",
    "가족 / 관계" : "span_LeafSubmenuLink LIST1", 
    "건강 / 웰빙" : "span_LeafSubmenuLink LIST2",
    "경영 / 경제" : "span_LeafSubmenuLink LIST3",
    "과학 / 수학" : "span_LeafSubmenuLink LIST4",
    "만화" : "span_LeafSubmenuLink LIST5",
    "소설 / 문학" : "span_LeafSubmenuLink LIST6",
    "어린이" : "span_LeafSubmenuLink LIST7",
    "여행" : "span_LeafSubmenuLink LIST8",
    "역사" : "span_LeafSubmenuLink LIST9",
    "예술과 디자인" : "span_LeafSubmenuLink LIST10",
    "외국어 / 교재" : "span_LeafSubmenuLink LIST11",
    "요리 / 음료" : "span_LeafSubmenuLink LIST12",
    "인물 / 자서전" : "span_LeafSubmenuLink LIST13",
    "정치 / 사회" : "span_LeafSubmenuLink LIST14",
    "종교" : "span_LeafSubmenuLink LIST15",
    "컴퓨터 / 기술" : "span_LeafSubmenuLink LIST16"
  }

  /* 장르 메뉴 클릭 시 li 메뉴 활성화 */

  document.body.addEventListener('click', function(e) {
    if (e.target === oEl.elButton || e.target === oEl.elSpanButton) {
      actionBarOn();
      divAppOff();
    }

    else if (e.target === oEl.elApps || e.target === oEl.elUlApps) {
      divAppOn();
    }

    else if (e.target.className.search('span_App') === 0 || e.target.className.search('li_App') === 0) {
      divAppOn();
    }

    else {
      actionBarOff();
      divAppOff();
    }

    document.onselectstart = function () { return true; };
    document.ondragstart = function () { return true; };
  }, false);

  function  actionBarOn() {
    oEl.elActionBar.style.display = "block";
  }

  function  actionBarOff() {
    oEl.elActionBar.style.display = "none";
  }

  function divAppOn() {
    oEl.elDivApps.style.display = "block";
    oEl.elDivAppsEdgeCover.style.display = "block";
    oEl.elDivAppsEdge.style.display = "block";
  }

  function divAppOff() {
    oEl.elDivApps.style.display = "none";
    oEl.elDivAppsEdgeCover.style.display = "none";
    oEl.elDivAppsEdge.style.display = "none";
  }  


  /* 더보기 메뉴 선택 시 책 추가 */

  oEl.elSpanMore.addEventListener('click', addBookElement, false);

  function addBookElement() {
    loadingOnAndOff();
    var request = new XMLHttpRequest();


    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        var bookElement = "";
        var categoryName = oEl.elSpanHeader.innerText;
        var sTemplate = oEl.elTemplate.innerText;
        oAddBookList = request.responseText;
        oAddBookList = JSON.parse(oAddBookList);
        oAddBookList[oCategoryName[categoryName]].forEach(function(value) {
          var result = sTemplate.replace('<%=Name%>', value.Name).replace('<%=Name%>', value.Name).replace('<%=Name%>', value.Name).replace('<%=ImageLink%>', value.ImageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=Writer%>', value.Writer).replace('<%=Writer%>', value.Writer).replace('<%=WriterLink%>', value.WriterLink).replace('<%=Price%>', value.Price);
          bookElement += result;
        });
        var sectionBooks = "<div class='section_Books add'><div class='addBookDiv'></div></div>";
        oEl.elBooks.insertAdjacentHTML('afterend', sectionBooks);
        document.getElementsByClassName('addBookDiv')[0].insertAdjacentHTML('afterend', bookElement);
        oEl.elSpanMore.style.display = "none";
      }
    }
    
    request.open("GET", "http://10.73.38.173:8000/addBookList.JSON", true);
    request.send(null);
  }

  /* li 메뉴 선택 시 책 내용 변경 */

  oEl.elSubmenuWrapper.addEventListener('click',function(e) {
    if (oEl.elSpanMore.style.display === "none") {
      var removeAddDiv = document.getElementsByClassName("section_Books add")[0];
      removeAddDiv.remove(removeAddDiv);
      oEl.elSpanMore.style.display = "block";
    }
    var _el = e.target;
    runParseHTML(_el.className);
  }, false);

  function runParseHTML(sKey) {
    loadingOnAndOff();
    var request = new XMLHttpRequest();
    request.open("GET", "http://10.73.38.173:8000/bookList.JSON", true);
    request.send(null);
    
    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        oBookList = request.responseText;
        oBookList = JSON.parse(oBookList);
        var bookElement = "";
        var sTemplate = oEl.elTemplate.innerText;
        oBookList[sKey].forEach(function(value) {
          var result = sTemplate.replace('<%=Name%>', value.Name).replace('<%=Name%>', value.Name).replace('<%=Name%>', value.Name).replace('<%=ImageLink%>', value.ImageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=PageLink%>', value.PageLink).replace('<%=Writer%>', value.Writer).replace('<%=Writer%>', value.Writer).replace('<%=WriterLink%>', value.WriterLink).replace('<%=Price%>', value.Price);
          bookElement += result;
        });
        var listName = sKey.replace("span_LeafSubmenuLink ","");
        oEl.elSpanHeader.innerText = oLiList[listName];
        oEl.elSpanSubtile.style.display = "none";
        oEl.elBooks.innerHTML = bookElement;
      }
    }
  }

  /* 더보기, 카테고리 클릭 시 로딩페이지가 뜨는 함수 */

  function loadingOnAndOff() { // 로딩페이지를 on한 후 off하는 함수
    oEl.elOverlay.style.display = "block";
    setTimeout(loadingOff, 500);
  }

  function loadingOff() { // 로딩페이지를 off하는 함수
    oEl.elOverlay.style.display = "none";
  }

  /* 구글앱 이동 함수 */

  oEl.elDivApps.addEventListener('mouseover', moveGoogleApps, false);

  function moveGoogleApps(e) {
    if(!(e.target.parentElement.className.search('span_App'))) {
      document.onselectstart = function () { return false; };
      document.ondragstart = function () { return false; };

      var moveTarget = e.target.parentElement;

      moveTarget.onmousedown = mousedown;
    }

    function mousedown(e) {
      moveTarget.style.cursor = "url('http://blog.vjeux.com/wp-content/uploads/2012/07/closed-mac.png'), pointer";
      
      var oAppsProperty = [
        { className : 'span_App app1' },
        { className : 'span_App app2' },
        { className : 'span_App app3' },
        { className : 'span_App app4' },
        { className : 'span_App app5' },
        { className : 'span_App app6' },
        { className : 'span_App app7' },
        { className : 'span_App app8' },
        { className : 'span_App app9' }
      ];

      var oApps = [];

      makeObjectAppsArray(oAppsProperty);

      var targetAppPositionNumber = parseInt(moveTarget.className.replace("span_App app",""));
      var currentAppPositionNumber = targetAppPositionNumber;

      var orgX = e.clientX;
      var orgY = e.clientY;
      var appX = parseInt(document.defaultView.getComputedStyle(moveTarget).getPropertyValue('transform').split(", ")[4]);
      var appY = parseInt(document.defaultView.getComputedStyle(moveTarget).getPropertyValue('transform').split(", ")[5].replace(")",""));

      moveTarget.onmousemove = mousemove;
      moveTarget.onmouseup   = mouseup;
      moveTarget.onmouseout  = mouseup;

      function mousemove(e) {
        targetPositionX = e.clientX - orgX + appX;
        targetPositionY = e.clientY - orgY + appY;
        moveTarget.style.transition = "none";
        moveTarget.style.transform = "translate(" + targetPositionX + "px, " + targetPositionY + "px" ;

        var currentX = document.defaultView.getComputedStyle(moveTarget).getPropertyValue('transform').split(", ")[4];
        var currentY = document.defaultView.getComputedStyle(moveTarget).getPropertyValue('transform').split(", ")[5].replace(")","");

        currentAppPositionNumber = getCurrentPositionNumber(currentX, currentY);
        
        if (targetAppPositionNumber < currentAppPositionNumber) {      
            changeAppPosition(targetAppPositionNumber, currentAppPositionNumber);
        }

        else if (targetAppPositionNumber > currentAppPositionNumber) {
            changeAppPositionBack(targetAppPositionNumber, currentAppPositionNumber);
        }

        moveTarget.className = 'span_App app0'; // 시작 위치의 App 위치 이동을 위해 임시적으로 Target의 Classname 변경
        
        makeObjectAppsArray(oAppsProperty);

        targetAppPositionNumber = currentAppPositionNumber;
      }

      function mouseup() {
        moveTarget.removeAttribute("style");
        moveTarget.style.transition = "none";

        moveTarget.className = oAppsProperty[currentAppPositionNumber-1].className;
        
        moveTarget.onmousemove = unbind;
        moveTarget.onmouseup = unbind;
        moveTarget.onmouseout = unbind;
      }

      function unbind() {
        moveTarget.style.transition = "transform 0.2s cubic-bezier(0.333, 0, 0, 1)";
      }

      function makeObjectAppsArray(oAppsProperty) {
        for(var i in oAppsProperty) {
          oApps[i] = document.getElementsByClassName(oAppsProperty[i].className)[0];
        }
      }

      function changeAppPosition(targetAppPositionNumber, currentAppPositionNumber) {
        for (var i = currentAppPositionNumber - 1; i > targetAppPositionNumber - 1; i--) {
          oApps[i].className = oAppsProperty[i-1].className;
        }
      }

      function changeAppPositionBack(targetAppPositionNumber, currentAppPositionNumber) {
        for (var i = currentAppPositionNumber - 1; i < targetAppPositionNumber - 1; i++) {
          oApps[i].className = oAppsProperty[i+1].className;
        }
      }

      function getCurrentPositionNumber(currentX, currentY) {
        var totalWidth    = parseInt(document.defaultView.getComputedStyle(oEl.elUlApps).getPropertyValue('width'));
        var totalHeight   = parseInt(document.defaultView.getComputedStyle(oEl.elUlApps).getPropertyValue('height'));

        var numbersOfRowApps = 3;
        var numbersOfColumnApps = 3;

        var rowGap = totalWidth / numbersOfRowApps;
        var columnGap = totalHeight / numbersOfRowApps;

        var left   = rowGap / 2;
        var right = left + rowGap;
        var top    = columnGap / 2;
        var bottom = top + columnGap;

        var positionNumber = 0;

        positionNumber += checkInRange(currentX, left, right);
        positionNumber += (checkInRange(currentY, top, bottom) - 1) * 3;

        return positionNumber;
      }

      function checkInRange(val, start, end) {
        if (val < start) {
          return 1;
        }
        if (val >= start && val < end) {
          return 2;
        }
        if (val >= end) {
          return 3;
        }
      }
    }
  }
});

/* function takeObjectFromGoogle() {
  var result = "";
  var name = document.getElementsByClassName('cover-image');
  var pageLink = document.getElementsByClassName('card-click-target');
  var writer = document.getElementsByClassName('subtitle');
  var price = document.getElementsByClassName('price buy');

  for (var i=0, j=0; i<12; i++, j += 4) {
    if (i<6) continue;
    else {
      result += "\n{\n";
      result += "\t\"Name\" : \"" + name[i].alt + "\",\n";
      result += "\t\"ImageLink\" : \"" + name[i].src + "\",\n";
      result += "\t\"PageLink\" : \"" + pageLink[j].href + "\",\n";
      result += "\t\"Writer\" : \"" + writer[i].title + "\",\n";
      result += "\t\"WriterLink\" : \"" + writer[i].href + "\",\n";
      if (i == 11) {
        result += "\t\"Price\" : \"" + price[j].innerText.replace('₩','').replace('  ', '').replace('  ', '') + "\"\n";
      }
      else {
        result += "\t\"Price\" : \"" + price[j].innerText.replace('₩','').replace('  ', '').replace('  ', '') + "\",\n";
      }

    }

    if (i < 11)
      result += "},";
    if (i == 11)
      result += "}\n";
  }
  return result;
}

var result = takeObjectFromGoogle();

result; */