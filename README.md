# 톡톡! 행동기록장

수업 중 3초 기록, 쉬는 시간 1분 정리. 기록은 이 기기에 먼저 저장되고, 설정에서 구글 시트를 연결하면 시트에도 쌓입니다.

## 폴더 구성
- public/index.html : 앱 화면
- src/worker.js : AI 심화 분석 서버 (Cloudflare Workers). 제미나이 키는 여기에 쓰지 않고 Cloudflare 비밀 변수로만 넣습니다.
- wrangler.jsonc : Cloudflare 설정 (name 은 Cloudflare 의 Worker 이름과 같아야 합니다)

## 배포 순서
1. GitHub 에서 새 저장소(예: toktok-record)를 만들고, 이 폴더 안의 내용(public, src, wrangler.jsonc, README.md)을 폴더째 올립니다. (Add file → Upload files)
2. Cloudflare 대시보드 → Workers & Pages → 만들기 → Git 저장소 가져오기(Import a repository) → 위 저장소를 고릅니다.
   Worker 이름은 toktok-record 로 하고, 나머지는 기본값으로 배포합니다. (화면 이름은 조금 다를 수 있습니다)
3. 배포가 끝나면 그 Worker → Settings → Variables and Secrets → Add
   - 유형: Secret / 이름: GEMINI_API_KEY / 값: 제미나이 API 키 → Deploy
4. (선택) 모델을 바꾸려면 같은 곳에 변수 GEMINI_MODEL 을 추가합니다. 기본값은 gemini-3.8-flash 입니다.

## 꼭 알아 둘 것
- 학생 기록이 제미나이로 전송되므로, 결제가 연결된 유료 등급의 키를 쓰세요. 무료 등급은 입력 내용이 제품 개선에 쓰일 수 있다고 안내되어 있습니다.
- Google AI Studio 에서 월 예산 알림을 걸어 두세요. 이 사이트의 모든 사용자가 같은 키를 쓰게 됩니다.
- 키가 채팅이나 저장소, 화면 코드에 노출되었다면 바로 폐기하고 새로 발급하세요.
- 주소가 바뀌면 브라우저 저장소가 따로 생깁니다. 구글 시트에 연결하지 않고 기기에만 저장해 둔 기록은 예전 주소에서 [설정 → 백업 파일(JSON) 받기]로 저장한 뒤, 새 주소에서 [백업 복원]으로 가져오세요.
