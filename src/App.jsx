import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `당신은 비멤스(BEMEMS)의 해외영업 상무 정용찬입니다. 맘모그래피(유방촬영장비), 모바일 엑스레이, 포터블 엑스레이 등을 전 세계에 수출하는 20년 이상의 해외영업 베테랑입니다.

[선물 전략]
- 일품 소주(약 8불): "First Class 사업을 같이 하자"는 의미. 가성비 최고
- 황금 동전 초코렛: "달콤한 사업을 함께하여 동반자가 되자"는 의미
- 복주머니: "1년 동안 복을 보관하면 좋은 일이 생긴다" 설명
- 액자 선물: 바이어와의 첫 만남 사진을 담아 맞춤 제작. 감동의 눈물 수준
- 선물에는 반드시 스토리와 의미를 담아야 한다

[바이어 Ice Breaking]
- 몽골: 징기스칸 역사 이야기
- 이디오피아: 한국전쟁 파병 감사, 춘천 이디오피아 커피숍
- 터키: 6.25 참전 감사, 앙카라 고아원
- 탄자니아: 킬리만자로, 조용필 노래
- 중국: 생선 머리를 호스트 방향으로, 창신불식(創新不息)
- 남미: 스페인어로 간단한 인사
- 무슬림: 기도 시간 배려, 요가 매트 준비, 메카 방향 알려주기

[GE/Siemens 비교 질문 대응]
- "복싱도 체급이 있다. 다른 체급과 경기하는 것이 의미 있는가?"
- "우리는 한 배에 탄 운명이다. 새로운 시장을 함께 개척하자"
- "이스탄불 FIAT 택시처럼 천천히 시장 점유율을 높인다"

[장기 바이어 개발]
- 대리점 하나 만드는 데 기본 5년 이상
- 7년, 10년 메일 보내다 갑자기 연락 오는 경우 많다
- "The drop hollows the stone not by its force, but by its frequency"
- 포도는 때가 되어야 익는다

[전시회 노하우]
- 6개월 전부터 바이어들에게 참가 안내 서큘러 발송
- KOTRA 지원 프로그램 활용
- 약속 안 하고 오는 것이 남미 스타일 - 걱정 말 것
- 전시회 전 아침밥을 많이 먹어라 - 점심은 없다

[지역별 특성]
- 사우디/중동: 무슬림 기도 시간 배려, 할랄 음식
- 러시아: 대금 송금 문제 항상 체크
- 남미: 약속 안 하고 옴, 낙천적, 스페인어 몇 마디면 분위기 확 바뀜
- 인도네시아: 무슬림 80%, 등록 절차 복잡
- 필리핀: 정부 입찰 시장 중요

답변 스타일:
- 정용찬 상무님의 구어체로 실제 경험담을 들어 답변
- 유머와 위트를 곁들이되 핵심 노하우 전달
- "해서", "하여간에", "ㅎㅎ" 등 특유의 표현 사용
- 구체적인 스크립트나 멘트 예시 제공`;

const EXAMPLE_QUESTIONS = [
  "몽골 바이어가 무표정이에요. 어떻게 분위기를 풀까요?",
  "GE보다 왜 우리 제품이 좋냐고 물어봐요",
  "중동 무슬림 바이어 접대 어떻게 해요?",
  "전시회에서 바이어 못 만나면 어떡하죠?",
  "알제리 바이어가 여신으로 달라고 해요",
  "대리점 계약이 5년째 안 되네요",
  "선물 뭐 준비하면 좋을까요?",
  "남미 바이어 연락이 없어요",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "안녕하세요! 저는 비멤스 해외영업 상무 정용찬입니다. 해외영업 하다가 막히는 거, 바이어 상담 어떻게 해야 할지, 선물 뭐 줘야 할지... 뭐든 물어보세요. 20년 넘게 이 일 하면서 쌓인 노하우, 아낌없이 드리겠습니다. ㅎㅎ",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || loading) return;

    setInput("");
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "죄송합니다, 답변을 가져오지 못했습니다.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "오류가 발생했습니다. 다시 시도해 주세요." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Noto Sans KR', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --gold-dim: #8a6f30;
          --dark: #0a0a0f;
          --surface: #12121a;
          --surface2: #1a1a26;
          --border: rgba(201,168,76,0.2);
          --text: #e8e4d9;
          --text-dim: #9a9080;
        }
        .messages::-webkit-scrollbar { width: 4px; }
        .messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }
      `}</style>

      <div style={{ width: "100%", maxWidth: 800, padding: "32px 24px 20px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 16 }}>BEMEMS 해외영업 AI</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#e8e4d9", lineHeight: 1.3, marginBottom: 6 }}>정용찬 상무님의<br /><span style={{ color: "#c9a84c" }}>해외영업 노하우</span></div>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)", margin: "16px auto" }} />
        <div style={{ fontSize: 13, color: "#9a9080", lineHeight: 1.6 }}>20년+ 글로벌 의료기기 영업 경험 · 30개국+ 바이어 네트워크</div>
      </div>

      <div style={{ width: "100%", maxWidth: 800, flex: 1, display: "flex", flexDirection: "column", padding: "0 16px" }}>
        <div className="messages" style={{ flex: 1, overflowY: "auto", paddingBottom: 16, display: "flex", flexDirection: "column", gap: 16, maxHeight: "60vh" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", gap: 12, flexDirection: msg.role === "user" ? "row-reverse" : "row", animation: "fadeIn 0.3s ease" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, background: msg.role === "user" ? "rgba(201,168,76,0.15)" : "#1a1a26", border: `1px solid ${msg.role === "user" ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.2)"}` }}>
                {msg.role === "user" ? "👤" : "🌐"}
              </div>
              <div style={{ maxWidth: "75%", padding: "14px 18px", borderRadius: 16, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", background: msg.role === "user" ? "rgba(201,168,76,0.15)" : "#1a1a26", border: `1px solid ${msg.role === "user" ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.2)"}`, color: "#e8e4d9", borderTopLeftRadius: msg.role === "user" ? 16 : 4, borderTopRightRadius: msg.role === "user" ? 4 : 16 }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: "#1a1a26", border: "1px solid rgba(201,168,76,0.2)" }}>🌐</div>
              <div style={{ padding: "14px 18px", borderRadius: 16, background: "#1a1a26", border: "1px solid rgba(201,168,76,0.2)", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} style={{ width: 7, height: 7, background: "#8a6f30", borderRadius: "50%", animation: `bounce 1.2s ease ${delay}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 800, padding: "0 16px 16px" }}>
        <div style={{ fontSize: 11, color: "#9a9080", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>자주 묻는 질문</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {EXAMPLE_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)} disabled={loading} style={{ background: "#12121a", border: "1px solid rgba(201,168,76,0.2)", color: "#9a9080", fontSize: 12, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit" }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 800, padding: "12px 16px 24px" }}>
        <div style={{ display: "flex", gap: 10, background: "#12121a", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: "10px 14px" }}>
          <textarea
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e8e4d9", fontSize: 14, fontFamily: "inherit", resize: "none", lineHeight: 1.5 }}
            placeholder="바이어 상담, 선물 전략, 지역별 노하우... 뭐든 물어보세요"
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ width: 36, height: 36, background: "linear-gradient(135deg, #c9a84c, #8a6f30)", border: "none", borderRadius: 10, cursor: "pointer", color: "#0a0a0f", fontSize: 16, alignSelf: "flex-end", opacity: loading || !input.trim() ? 0.4 : 1 }}>↑</button>
        </div>
      </div>
    </div>
  );
}