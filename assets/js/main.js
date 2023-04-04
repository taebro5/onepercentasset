var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}
var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            $('.nums').each(function () {
                const $this = $(this),
                    countTo = $this.attr('data-count');

                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'linear',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                        //3자리 마다 콤마 표시 적용
                    }
                });
            });
        }
    });
}, options);
observer.observe(document.querySelector("#about"));
// 카드 요소들을 가져옴
const cards = document.querySelectorAll('.card-fade');

// 스크롤 이벤트 발생 시 카드를 슬라이드인하는 함수
function slideInCards() {
    cards.forEach((card) => {
        // 카드의 중심 좌표를 계산
        const cardCenter = card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2;
        // 현재 뷰포트의 중심 좌표를 계산
        const viewportCenter = window.innerHeight / 2;
        // 카드가 뷰포트 중심에 도달했을 때, 슬라이드인 효과를 적용
        if (cardCenter < viewportCenter) {
            card.classList.add('slide-in');
        }
    });
}

// 스크롤 이벤트 핸들러 등록
window.addEventListener('scroll', slideInCards);
function registration(regiType) {
    regiType = parseInt(regiType);
    $("#regiBtn").prop("disabled", true);
    $("#regiBtn").html("로딩 중...");
    let regiName = $("#name").val();
    let regiBirth = $("#birthday").val();
    let regiPhone = $("#phone").val();
    let regiEmail = $("#email").val();
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxuTXqA1a8q_iGUf2WwJJKlKImAh4SDK9-Cc239NtzAgavuIJ6eGAMS574dCDb85iBksg/exec",
        type: "GET",
        data: {
            이름: regiName,
            생년월일: regiBirth,
            연락처: regiPhone,
            이메일: regiEmail
        },
        success: function (data) {
            $("#regiBtn").prop("disabled", false);
            $("#regiBtn").html("신청하기");
            if (data.result = "success") {
                Swal.fire({
                    icon: "success",
                    title: "신청 성공",
                    text: "ONE PERCENT ASSET에 신청해주신 것을 감사드립니다. 최대한 빠른 시일 내에 답신 드리겠습니다."
                }).then((result) => {
                    location.reload();
                });
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}
$(document).ready(function () {
    setTimeout(function () {
        $("#exampleModal").modal("show");
    }, 2000); // 3000ms = 3s
});
window.onload = function () {
    const elm = document.querySelectorAll('.scroll-section');
    const elmCount = elm.length;
    elm.forEach(function (item, index) {
        item.addEventListener('mousewheel', function (event) {
            event.preventDefault();
            let delta = 0;

            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            }
            else if (event.detail)
                delta = -event.detail / 3;

            let moveTop = window.scrollY;
            let elmSelector = elm[index];

            // wheel down : move to next section
            if (delta < 0) {
                if (elmSelector !== elmCount - 1) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                    } catch (e) { }
                }
            }
            // wheel up : move to previous section
            else {
                if (elmSelector !== 0) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                    } catch (e) { }
                }
            }

            const body = document.querySelector('html');
            window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
        });
    });
}