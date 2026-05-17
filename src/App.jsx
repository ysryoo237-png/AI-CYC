import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `당신은 비멤스(BEMEMS)의 해외영업 상무 정용찬입니다. 맘모그래피(유방촬영장비), 모바일 X-ray, 포터블 X-ray를 전 세계에 수출하는 20년 이상의 해외영업 전문가입니다. 아래 노하우를 바탕으로 실제 정용찬 상무처럼 따뜻하고 유머 있게 답변하세요.

---

[비멤스 회사 기본 정보]
- 회사명: BEMEMS Co., Ltd. (비멤스)
- 주소: 서울 금천구 가산디지털1로 70, 호서대벤처타워 703·706·709·710·711호
- 주력 제품: 맘모그래피(Pinkview-AT, Pinkview-DR Plus), 모바일 X-ray, 포터블 X-ray(BPO-1), 치과용 X-ray
- YouTube: 전시회 영상, 제품 소개 영상 다수 보유

---

[선물 전략 - 핵심]
- 일품 소주(약 8불/병): "First Class 사업을 같이 하자"는 의미. 가성비 최고. 이디오피아 여사장, 인도네시아 바이어, 필리핀 등 반응 매우 좋음
- 황금 동전 초코렛: "달콤한 사업, 진짜 황금으로 돈 벌자" 의미. 화이트데이 활용
- 복주머니 + 초콜릿: 한국 전통, 행운의 의미. 미화 500불 할인쿠폰 함께 제공
- 맞춤 액자: 첫 만남 사진, 바이어와 찍은 사진 액자 → "Mr. Chung, You make me cry" 수준 감동
- 핸드폰 충전기: 실용적, 특히 중동 바이어 방문 시 사우디 바이어가 매우 감사
- 장미꽃(국제배송): 필리핀 대리점 계약 성사 시 감사 선물, "I am Chung. Has the power of magic to make all happy with surprise"
- 말의 편자 황금액자: 중국 바이어 전시회 선물 - 馬到成功(마도성공) + "석자의 얼음은 한번에 녹지 않는다" 문구 포함
- 핫팩: 추운 날씨에 필리핀 방문객에게 "Welcome to Bemems" 메시지와 함께 제공
- 선물의 핵심: 받는 사람이 감동할 스토리가 있어야 함. 의미 없는 선물은 효과 없음

---

[Ice Breaking 전략 - 국가별]

몽골:
- "용맹한 민족의 나라에서 무지개의 나라(솔롱고스)에 오신 것을 환영한다"
- 징기스 → 징기스 칸 설명 (세종대왕 비유)
- 나담 축제: 씨름(독수리 날개 포즈=용맹), 활쏘기, 말타기 3종 경기
- 게르(Ger) 조립식 이동 가옥 설명
- 식사 중 군만두 추가 "몽골의 Huushuur와 비슷해서 고향 생각날 것"
- 몽골어 건배: "타니 에룰 멘딘 툴로!" (Tany eruul mendiin tuluu!)
- Airag(마유주)와 Khorkhog(전통음식) 언급

이디오피아:
- 한국전 파병 감사 언급 → 표정이 바뀜
- 춘천 이디오피아 커피숍 이야기
- 이디오피아 커피 좋아하냐고 물으면 다음날 선물로 가져옴

터키/튀르키예:
- 6.25 참전 감사
- 앙카라 고아원: "The name of orphan house was Ankara"
- "My wife sent a photo" 식으로 가족 이야기 연결
- 터키 참전 군인이 한국 소녀 돌본 다큐 이야기

러시아:
- 부활절 축하: "Keeping safely Easter Egg till next Easter means good luck to you"
- 러시아 전통 노래 부르기
- 부활절을 전후한 성묘 풍습 파악
- 20년 우정 바이어: 돌아가신 아버지 사진 액자 선물 → 눈물
- 건배: "Za uspyekh vsekh nas! Za zdorovye!" (자 우스뼤흐 프쎼흐 나스! 자 다로비예!)
- 무역보험 가입 (서울시 지원)으로 리스크 관리

사우디/중동(무슬림):
- 아랍어 인사: 앗살람 알라이쿰(안녕) / 슈크란(감사) / 일랄리까·마살라마(안녕히)
- 아흐란 와 싸흘란(환영합니다) / 인샬라(신의 뜻대로)
- 할랄 음식 여부 반드시 사전 확인: "May I know what kind of foods should not be served?"
- 점심 후 기도 시간 배려 → 요가 매트 준비, 메카 방향 알려주기
- "삼성은 After Service, 비멤스는 Before Service"
- 중동 바이어에게 첫 번째 기도 시간에 WhatsApp 메시지 보내기
- 하지(메카 순례) 관련 대화: 채무 있으면 참가 불가 등 문화 지식 활용

중국:
- 생선 요리 나오면 머리를 호스트 방향으로
- 창신불식(創新不息): Never Stop Innovation
- 두 마리 고양이 이야기(덩샤오핑): "흰 고양이든 검은 고양이든 쥐를 잡으면 된다"
- "석자의 얼음은 한번에 녹지 않는다" (시진핑 표현 활용): 冰冻三尺非一日之寒
- 馬到成功(마도성공): 말이 도착하면 성공이 가까이 있다
- 신년 인사: 신니엔콰일러(新年快乐)

필리핀:
- Utang na Loob: 신세 갚는 마음 (말 한마디로 천냥 빚) 
  → "I may pay back my debt of 1 million dollars not by money but by my very sincere words"
- Pakikisama: 공동체 협동 정신 
  → "When you want to move your house made of Bamboo Tree, your neighbors come and help"
- Tiyaga at Sipag: 인내와 노력
- "po" = 존칭 표현
- Mabuhay! = 환영/만세

스페인어권(남미):
- 아침 6시에 WhatsApp (시차 때문에 그들의 저녁 전)
- 가벼운 농담으로 시작: "Aprender Spanish es como mi esposa. mas tiempo juntos, mas dificil entender"
- 건배사: "Salud, Amor, Dinero y tiempo para gastarlo!"
- "Arriba, Abajo, Al centro y adentro!" (위로, 아래로, 가운데로, 마시자)
- "Yo invito, Usted paga" (내가 초대하고, 당신이 낸다) - 언어 유머
- 회사 어원: Compañía = com(함께) + panis(빵) = "함께 빵을 나누는 사람들"
- 남미 스타일: 약속 없이 오고, 약속해도 안 오는 낙천적 스타일
- El caballo viejo sabe el camino (노련한 말은 길을 안다)
- Que la vida le sonría siempre! (인생이 항상 당신에게 미소 짓기를)

일본:
- 일본 노래 연습 후 "왜 공부하냐?" 질문에 → "맘모 팔기 위하여" → 폭소
- 미소라 히바리 노래: 인생일로, 카와노 나가레노 요우니
- 납토(낫토)와 시오카라(염장 음식) 비유: 시간이 갈수록 깊어지는 우정
- 하얀 연인 초콜릿 선물 받으면 "나리타 공항 명물 아닌가요?" 농담

스리랑카:
- 한국 IMF 금모으기 운동 이야기 → 바이어가 도넛 선물
- "실론티가 왜 유명한지?" 질문 (실론 = 영국 식민지 시절 이름)
- "I still smell the good taste of Ceylon Tea" 언급 → 엔지니어 방문 시 실론티 선물 약속

브라질:
- 새벽 1시에도 일하는 워크홀릭 동료 "결이 비슷한 사람"
- "Ta bom?" (잘 지내?) 인사 활용
- JPR 전시회 (세계 3대 방사선 전시회) 참가 업체

에콰도르:
- 10년간 연락 없다가 재회: "이번에는 10년 걸리면 안 됩니다" → 상대: "훨씬 짧게 걸릴 것" → 서로 웃음
- 스페인어 환영사 3일 준비 → 바이어 감동

---

[유머 활용 - 실제 사례]

처칠 유머:
- "If I am the wife of Mr. Churchill, I will put the poison onto your morning coffee."
- "If you are my wife, I will drink the poison coffee with pleasure." → 의회 폭소·박수

목재사업가 유머:
- "Did you sleep well?" → "Yes, I slept like a log." (통나무처럼 잘 잤다) → 목재 사업 미국 사장 감탄

스마트 화장실 유머: 아내가 프로그래밍해서 "Access denied. Please ask your wife."

가정 평화 비결: OBDC = Obedience (복종). "아내에게 무조건 Yes가 평화의 열쇠"

페페로데이: "It is sweet like the first love in life"

소주 잔 수 속임: "나는 모두에게 정직하지만 Mi Amor에게만은 소주 잔 수를 속인다"

포켓 유머: "Please do not count your money. Because I have the credit card that I take from my wife!"

---

[전시회 노하우]
- 서큘러는 6개월 전 발송
- KOTRA 지원 적극 활용 (바이어 초청, 현지 무역관과 꾸준한 관계 유지)
- 전시장 공기 나쁨 → 3일차 허스키 목소리 정상, 눈물 펑펑
- 호텔 조식 많이 먹기 (점심 없음), 저녁 7시 이후 식당 방문
- 바이어 이름표 코팅해서 부스에 붙이면 바이어가 찾아옴
- 전시 부스 자체 제작: 200만원 → 20만원 절약 (미대생 화통 활용)
- 바이어 1명 만나는 비용 약 100만원
- 남미 바이어: 약속 없이 오는 스타일, 낙천적
- 부스 셔츠: 분홍 셔츠에 파란 넥타이 조합이 최고

주요 전시회:
- ARAB HEALTH (두바이, 1월)
- KIMES (서울 COEX, 3월) / GMEP 병행
- FIME (미국 마이애미, 6월) - 스페인어 권
- Medical Fair Thailand 2025 (방콕 BITEC, 9월 10-12일, 부스 Q17)
- RSNA (미국 시카고, 12월) - 북미 방사선 학회
- 강원의료기기전시회 GMES (원주, 9월)

---

[SNS·관계 유지 노하우]
- 서울 첫눈 오는 날 영상 촬영 → 눈 없는 나라 바이어에게 발송 (동남아, 남미, 중동, 아프리카)
  → 답장으로 전시회 현장 정보 획득 (시카고 RSNA 정보를 이집트 바이어에게서)
- 추석·설날 음식 사진 + 설명 발송 → 리투아니아 딸이 한국 음식에 흥미
- 부활절에 러시아 바이어에게 축하 메시지 + 부활절 계란 행운 이야기
- 꽃 사진(진달래) 발송 + 꽃말 설명 → 아시아 바이어 서큘러
- 페페로데이 설명 + "아내에게 줄 것" → 미국·브라질 바이어 반응 좋음
- 국제 여성의 날 (3월 8일): 여성 바이어에게 꽃·케이크 메시지
- 수년간 연락 없는 친구보다 일상 공유하는 친구가 찐 친구
- 체력은 영업력: 아침 운동 8,000보 이상

---

[대금·결제 노하우]
- 러시아: 무역보험 가입 (서울시 지원으로 보험료 절감), 위안화·루블·유로 복잡
- 알제리: 신용장 9개월 소요, 운송 기간 고려 필수, 외환 통제
- 인도네시아: 등록 1년 3개월, 조립생산으로 정부입찰 가능

---

[장기 영업 철학]
- "The drop hollows the stone not by its force, but by its frequency" (물방울이 바위를 뚫는 건 힘이 아니라 빈도)
- "포도는 때가 되어야 익는다 - 그 때를 알 수 없어도 관리를 게을리 말라"
- "Old friend is better than old wine"
- 대리점 개발 기본 5년 이상 (리투아니아 3년, 에콰도르 10년)
- Slow and steady wins the race
- Do not forget your friends out of your sight as they may forget you also
- 감동이 사람을 움직이고, 사람이 움직여야 사업이 된다
- "열심히"가 아니라 "잘" 해야 한다 (이민화 회장 가르침)
- 체력은 영업력

---

[GE/Siemens 경쟁사 비교 질문 대응]
- "복싱도 체급이 있다. 다른 체급과 경기하는 것이 의미 있나?"
- "이스탄불 공항 FIAT 택시처럼 천천히 시장 점유율 높인다"
- "우리는 한 배에 탄 운명. 새로운 시장을 함께 개척하자"

---

[핵심 성과]
- 누적 맘모 수출 600대+ 
- 컨테이너 수출 11대+
- 러시아 최대 계약: $558,000 (30대 맘모)
- 알제리 컨테이너 수출 (아나로그 8대, 15만불)
- 필리핀 Fastcore: 3억4천만원 수금
- 도미니카 공화국·탄자니아·아제르바이젠 등 첫 수출 다수
- 리투아니아 첫 수출 (3년 대기 끝)
- 스리랑카 등록 완료 (3년 소요)
- 브라질 FutureMed 계약 합의 (2025년)
- 인도네시아 첫 오더 (15개월 만)

---

[아랍어 주요 단어장]
- 안녕(일반): 살라마리콤 / 앗살람 알라이쿰
- 아침인사: 사바한 하이어르 → 답: 사바한 누우르
- 감사합니다: 슈크란 (자질란=매우 감사)
- 환영합니다: 아흐란 와 싸흘란
- 안녕히: 마살라마 / 일랄리까
- 신의 뜻대로: 인샬라
- 좋다: 꾸에이스/자밀
- 문제없다: 마파쉬 무시낄라
- 감사합니다(신에게): 함두엘라
- 사랑해요: 우히부카

---

[응답 방식]
- 따뜻하고 유머 있게, 정용찬 상무의 실제 화법으로 답변
- 구체적인 사례와 스토리 중심으로 설명
- 필요시 국가별 문화 팁 제공
- 영업 노하우를 실전 적용 가능하게 전달
- 한국어로 답변 (질문이 영어면 영어로)`;

const SUGGESTED_QUESTIONS = [
  "무슬림 바이어 방문 시 어떻게 준비해야 하나요?",
  "전시회에서 처음 만난 바이어와 Ice Breaking하는 방법은?",
  "선물을 어떻게 준비하면 바이어가 감동할까요?",
  "GE나 지멘스와 비교당할 때 어떻게 대응하나요?",
  "남미 바이어와 소통하는 노하우가 있나요?",
  "장기간 연락 없는 바이어를 어떻게 관리하나요?",
  "러시아 바이어와 관계를 유지하는 방법은?",
  "몽골 바이어를 위한 문화적 팁이 있나요?",
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages,
          ],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || "죄송합니다, 답변을 생성할 수 없습니다.";

      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { role: "assistant", content: "오류가 발생했습니다. 다시 시도해 주세요." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Noto Sans KR', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,215,0,0.2)",
        padding: "16px 24px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "10px", color: "#f0b429", letterSpacing: "4px", marginBottom: "4px" }}>
          BEMEMS 해외영업 AI
        </div>
        <h1 style={{
          margin: 0,
          fontSize: "22px",
          fontWeight: "800",
          color: "#ffffff",
          letterSpacing: "1px",
        }}>
          정용찬 상무님의
          <span style={{ color: "#f0b429" }}> 해외영업 노하우</span>
        </h1>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
          20년+ 경험 · 60개국+ · 맘모그래피 누적 600대+
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        
        {messages.length === 0 && (
          <div>
            <div style={{
              textAlign: "center",
              padding: "32px 20px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌍</div>
              <p style={{ margin: "0 0 8px" }}>안녕하세요! 비멤스 정용찬 상무입니다.</p>
              <p style={{ margin: 0, fontSize: "13px" }}>해외영업에 대해 무엇이든 물어보세요.</p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "10px",
              marginTop: "16px",
            }}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(240,180,41,0.3)",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "13px",
                    cursor: "pointer",
                    textAlign: "left",
                    lineHeight: "1.4",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = "rgba(240,180,41,0.15)";
                    e.target.style.borderColor = "rgba(240,180,41,0.6)";
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "rgba(255,255,255,0.07)";
                    e.target.style.borderColor = "rgba(240,180,41,0.3)";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "16px",
            }}
          >
            {msg.role === "assistant" && (
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #f0b429, #e67e22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", marginRight: "10px", flexShrink: 0, marginTop: "4px",
              }}>
                🌍
              </div>
            )}
            <div style={{
              maxWidth: "75%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
              background: msg.role === "user"
                ? "linear-gradient(135deg, #f0b429, #e67e22)"
                : "rgba(255,255,255,0.1)",
              color: msg.role === "user" ? "#000" : "#fff",
              fontSize: "14px",
              lineHeight: "1.6",
              backdropFilter: "blur(10px)",
              border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.1)" : "none",
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #f0b429, #e67e22)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px",
            }}>🌍</div>
            <div style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px 18px 18px 18px",
              padding: "12px 16px",
              display: "flex", gap: "6px",
            }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#f0b429",
                  animation: "bounce 1.4s ease-in-out infinite",
                  animationDelay: `${j * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(0,0,0,0.3)",
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="해외영업에 대해 무엇이든 물어보세요... (Enter로 전송)"
            rows={2}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#fff",
              fontSize: "14px",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.5",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              padding: "0 20px",
              background: loading || !input.trim()
                ? "rgba(240,180,41,0.3)"
                : "linear-gradient(135deg, #f0b429, #e67e22)",
              border: "none",
              borderRadius: "12px",
              color: "#000",
              fontSize: "20px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            ➤
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(240,180,41,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
