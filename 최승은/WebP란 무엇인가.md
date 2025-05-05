## 1. WebP란 무엇인가

### WebP 포맷 정의

WebP는 Google이 개발한 현대적인 이미지 포맷으로, JPEG나 PNG보다 더 높은 압축 효율을 자랑하면서도 품질 손상을 최소화하는 것을 목표로 한다.
`.webp` 확장자를 사용하며, 웹 환경에서 빠른 로딩과 트래픽 절감을 위해 최적화된 포맷이다.

### 개발 배경

Google은 웹 페이지 로딩 속도 향상을 위해 이미지 최적화에 주목했고,
특히 전체 웹 트래픽의 약 60~70%가 이미지 전송에서 발생한다는 점에 착안해 2010년에 WebP를 발표하였다.
이 포맷은 Google의 VP8 비디오 코덱을 기반으로 한 프레임 압축 기술을 사용하여 효율적인 이미지 전송을 가능케 한다.

### JPEG, PNG, GIF 대비 WebP의 특징 비교

기능 |	WebP |	JPEG |	PNG |	GIF
--|--|--|--|--
손실 압축 |	지원	| 지원 |	미지원 |	미지원
무손실 압축 |	지원 |	미지원 |	지원 |	지원(제한적)
알파 지원 |	지원 |	미지원 |	지원 |	지원
애니메이션	지원 |	미지원 |	미지원 |	지원
파일 크기 |	가장 작음 |	크다 |	크다	| 중간
브라우저 지원 |	Chrome, Edge, Firefox 등 대부분 |	거의 모두 |	거의 모두 |	거의 모두

### WebP의 핵심 기능
1. Lossy Compression (손실 압축)
   - VP8 인트라 프레임 코덱 기반
   - JPEG보다 약 25~34% 더 작은 파일 크기
   - 품질 손실을 시각적으로 최소화
2. Lossless Compression (무손실 압축)
   - PNG보다 평균 26% 더 작게 압축 가능
   - 색상 반복 패턴 및 팔레트 최적화를 통해 크기 절감
3. 알파(Alpha) 채널 지원
   - 투명 배경을 가지는 이미지 구현 가능
   - 무손실 및 손실 압축 모두에서 알파 지원
4. 애니메이션 지원
	 - GIF보다 부드러운 전환과 작은 파일 크기를 제공
	 - 반복 설정, 프레임 지연 설정 가능

### 주요 장점 요약
- 고압축률: JPEG나 PNG 대비 더 작으면서도 품질 유지
- 기능 통합: 손실/무손실, 알파, 애니메이션까지 하나의 포맷에서 지원
-	트래픽 절감 및 로딩 속도 향상: 웹사이트 성능 개선에 기여
-	브라우저 호환성 확대: 주요 브라우저에서 대부분 지원

### 주요 단점 요약
	•	구형 브라우저 호환성 문제: IE, 일부 구버전 Safari에서는 미지원
	•	편집 툴/앱 호환성 부족: 일부 툴에서는 직접 편집 불가하거나 변환이 필요
	•	압축 속도: 무손실 압축 시 PNG보다 느릴 수 있음

## 2. WebP의 작동 원리

### VP8 영상 포맷 기반

WebP는 Google의 **VP8 비디오 코덱의 인트라 프레임 구조**를 기반으로 한다.
즉, WebP는 **동영상의 한 프레임**을 정적인 이미지처럼 사용하면서, 고성능 압축 기법을 이미지에 그대로 적용한다.
- WebP (손실 압축) → VP8 인트라 프레임을 활용
- WebP (무손실 압축) → 별도의 전용 압축 알고리즘 사용 (VP8과는 다름)

#### 예측(Prediction) → 변환(Transformation) → 부호화(Encoding)

WebP는 기본적으로 아래 세 단계를 거쳐 이미지를 압축한다:

1. 예측(Prediction)
   - 이미지의 **인접 블록(픽셀 덩어리)**을 기반으로 현재 블록의 값을 예측
   - 예측값과 실제값의 차이(잔차, residual)를 다음 단계로 전달
   - 이 방식은 공간적인 패턴이 반복되는 이미지에서 매우 효과적
2. 변환(Transformation)
   - 예측된 잔차(residual)에 대해 DCT(이산 코사인 변환) 또는 Walsh-Hadamard Transform 등을 적용
   - 공간 정보를 주파수 영역으로 변환하여 정보 밀도가 높은 성분을 우선 처리
   - 시각적으로 민감한 정보와 덜 민감한 정보를 구분해 효율적 압축 가능
3. 부호화(Encoding)
   - 양자화(Quantization)를 거쳐 수치를 정수화한 후
   - Huffman 부호화 등의 엔트로피 코딩으로 압축
   - 자주 등장하는 값을 더 짧은 비트로 표현해 용량을 줄인다


### 손실 WebP vs 무손실 WebP의 차이점

항목 |	손실 WebP |	무손실 WebP
--|--|--
기반 포맷 |	VP8 인트라 프레임 |	독자적 알고리즘
압축 방식 |	예측 + 변환 + 양자화 + Huffman | 부호화	색 변환 + 예측 + 인코딩
투명도 지원 |	지원 (손실 + 알파 가능) |	지원
압축 | 효율	더 작고 빠름 |	더 정확하지만 느림
주요 사용 사례 |	썸네일, 웹 이미지 |	UI 아이콘, 일러스트, 알파가 중요한 이미지

무손실 WebP는 PNG와 비슷하게 작동하면서도 평균적으로 더 높은 압축률을 제공하며, 기존 포맷과의 호환성도 우수하다.

## WebP의 Compression 알고리즘 이해

WebP가 높은 압축률을 달성하는 이유는 다음과 같은 고급 기술을 결합하기 때문이다.

1. Color Transform (색 변환)
  - RGB → YUV 또는 다른 색공간으로 변환
	- 시각적으로 민감하지 않은 채널(U, V)에 더 많은 손실을 허용
	- 시각적 품질은 유지하면서 용량은 크게 줄임

2. Spatial Prediction (공간 예측)
  - 주변 픽셀의 색상 패턴을 분석해 현재 픽셀 값을 예측
	- 실제 값과의 차이만을 기록 → 데이터 중복 최소화
	- 이는 영상 압축 기술에서 차용한 고급 기법이다

3. Huffman Coding (허프만 코딩)
  - 빈도 기반의 부호화 기법으로, 자주 등장하는 픽셀 값에 짧은 비트, 드문 값에 긴 비트를 할당
	- 무손실 압축에서도 적용되어 압축률을 크게 향상시킴

## 3. WebP 포맷 구조

### 1. Container 구조 (RIFF 기반)

WebP는 RIFF(Resource Interchange File Format) 컨테이너 포맷을 기반으로 한다.
RIFF는 Microsoft가 만든 범용 포맷으로, 데이터를 “Chunk” 단위로 구분해 저장한다.
즉, WebP는 RIFF 포맷의 확장 버전이며, 내부적으로 다양한 타입의 Chunk를 조합해 이미지 정보를 표현한다.

```
+----------------+----------------+
| RIFF Header    | 'WEBP' Tag    |
+----------------+----------------+
| Chunk #1       | VP8 / VP8L / VP8X |
| Chunk #2       | ALPH / ANIM / etc. |
| ...            | ...             |
+----------------+----------------+
```

- RIFF Header: 항상 “RIFF”로 시작, 뒤에 전체 파일 크기 명시
- Format: “WEBP”로 고정
- Chunk: 실제 이미지 데이터 및 메타 정보가 포함되는 구조

### 2. 주요 Chunk 설명

- VP8 Chunk (손실 압축)
  - VP8 비디오 코덱의 인트라 프레임 포맷을 이용해 손실 압축 데이터를 저장한다.
  - JPEG과 유사한 방식으로 YUV 변환, 블록 기반 예측, DCT, 양자화 등을 포함한다.
  - Chunk 타입: VP8  (공백 포함, ASCII로 정확히 ’VP8 ’)

- VP8L Chunk (무손실 압축)
	-	WebP 전용 무손실 압축 알고리즘을 사용
  - 색 변환, 팔레트 압축, LZ77 + Huffman 코딩 등이 결합
  - PNG 대비 25~30% 작은 크기를 달성
  - Chunk 타입: VP8L

- VP8X Chunk (확장 헤더)
	•	확장 기능을 사용하는 WebP 이미지에서 사용됨
	•	WebP에서 알파 채널, 애니메이션, ICC 프로파일 등의 기능을 포함할 수 있도록 정의된 메타 정보 Chunk
	•	포함 여부를 비트 플래그로 제어

```
VP8X Flags:
- Bit 0: Reserved
- Bit 1: ICC profile 존재 여부
- Bit 2: 알파 채널 존재 여부
- Bit 3: EXIF 메타데이터
- Bit 4: XMP 메타데이터
- Bit 5: 애니메이션 여부
```

### 3. Alpha Channel 처리 방식
- WebP는 PNG처럼 알파(투명도) 채널을 지원하며, 손실/무손실 모두 가능
- 알파 정보는 별도의 ALPH Chunk 또는 VP8X + 압축된 알파 스트림 형태로 포함됨
- 프리멀티플 알파(premultiplied alpha) 방식 적용 가능
- 무손실 WebP에서는 더 정밀한 알파 표현 가능

### 4. Animation 처리 방식 (프레임별 처리)

WebP는 GIF 대체를 목표로 애니메이션 기능도 지원한다. 이때 다음과 같은 구조로 처리된다:

- 주요 Chunk
  -	ANIM: 전체 애니메이션 설정 (루프 횟수 등)
	-	ANMF: 각 프레임 정보 (시작 시간, 지속 시간, 위치, 이미지 데이터 등 포함)

- 작동 방식
  1. VP8X Chunk의 애니메이션 플래그가 활성화되어 있어야 함
	2. ANIM Chunk가 loop count 등의 전역 설정을 담고
	3. 각 프레임은 ANMF Chunk 단위로 표현되며, 내부에 VP8 또는 VP8L 압축 이미지가 삽입됨
	4. 각 프레임은 독립적으로 해석되며 위치/지속 시간/블렌드 설정 포함 가능

```
+------------------+
| VP8X (Animation) |
+------------------+
| ANIM (global)    |
+------------------+
| ANMF (frame 1)   |
+------------------+
| ANMF (frame 2)   |
+------------------+
```

## 4. WebP와 기존 포맷 비교

WebP는 JPEG, PNG, GIF 등 기존 이미지 포맷을 대체하기 위해 등장했지만, 무조건적인 대체보다는 각 포맷의 특성을 이해하고 목적에 맞게 선택하는 것이 중요하다. 이 섹션에서는 성능, 유연성, 실무 적용성 관점에서 WebP를 중심으로 비교해 본다.

### 실무 기준 비교 포인트

항목 |	JPEG |	PNG |	GIF |	WebP
--|--|--|--|--
주요 용도 |	사진 |	투명 UI 요소 |	단순 애니메이션	사진, UI, 애니메이션 | 모두
압축 방식 |	손실 |	무손실 |	무손실 (8bit) |	손실 + 무손실
알파 채널 |	❌ |	✅ |	✅ (1비트) |	✅ (8비트)
애니메이션 지원 |	❌ |	❌ |	✅ |	✅
브라우저 호환성 |	✅ (전부 지원) |	✅ (전부 지원) |	✅ (전부 지원) |	✅ (대부분, IE 제외)
파일 크기 |	보통 |	큼 |	큼 |	가장 작음
색상 표현 |	24bit |	24/32bit |	256색 제한 |	24/32bit
편집 호환성 |	매우 높음 |	매우 높음 |	매우 높음 |	일부 툴에서 제한적

### 어떤 상황에서 어떤 포맷을 쓰는가?
-	JPEG → WebP로 대체 가능
  -	사진, 썸네일, 배너 등: WebP로 전환 시 화질 손상 없이 용량 25~30% 절감
  -	단, 구형 브라우저 지원이 필수라면 JPEG fallback 병행 필요
-	PNG → WebP 무손실로 대체 가능
  -	UI 아이콘, 로고, 투명 이미지: WebP 무손실 압축은 PNG 대비 더 작은 용량 + 알파 지원
  -	단, 픽셀 단위 정밀 편집 시 PNG가 여전히 유리
-	GIF → WebP 애니메이션으로 대체 권장
  -	WebP 애니메이션은 GIF 대비 더 많은 색상, 더 작은 파일 크기, 더 부드러운 전환 제공
  -	단, 소셜 플랫폼 등에서의 GIF 지원 우위는 아직 유효

## 상호 운용성 및 fallback 전략

WebP는 모든 플랫폼에서 기본적으로 사용 가능하진 않다. 따라서 아래 전략이 필요하다:

1.	HTML <picture> 태그 활용

```
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="대체 이미지">
</picture>
```

2.	빌드 시 자동 변환 및 fallback 생성
  -	sharp, imagemin, squoosh-cli 등으로 WebP + JPEG/PNG를 동시에 생성
	-	사용자의 브라우저에 따라 자동 선택되도록 설정
3.	CDN/이미지 최적화 도구 활용
	-	Cloudflare, AWS CloudFront, imgix 등은 브라우저 감지 후 WebP 자동 제공

###  WebP를 맹신하면 안 되는 경우
-	IE11 완전 지원이 필요한 레거시 사이트
-	이미지 수정 주기가 잦은 툴 체계 (ex. Adobe 전용 워크플로우)
-	픽셀 정확도 요구 (도면, 법적 이미지 등)

## 5. WebP 변환과 최적화 방법

### 변환 도구 소개

1. cwebp – Google의 공식 CLI 툴
	-	WebP 포맷을 만들기 위한 가장 기본적이고 신뢰성 높은 도구
	-	다양한 인코딩 옵션과 파라미터 제공 (Q값, 크기 조절, 압축 모드 등)
	-	brew install webp (macOS 기준) 으로 설치 가능

2. imagemin-webp – Node.js 기반 이미지 최적화 플러그인
	-	Webpack, Rollup, Gulp 등의 번들러에 자동 이미지 최적화 파이프라인으로 연동
	-	CI/CD 환경이나 정적 사이트 빌드 시 유용
	-	대표 플러그인:
	-	imagemin-webp
	-	vite-imagetools
	-	webpack-image-loader + imagemin-plugin

3. 클라우드 기반 도구 (비개발자/디자이너도 활용 가능)
	-	Squoosh: Google이 만든 웹 기반 이미지 최적화 툴. 품질 실시간 비교 가능
	-	TinyPNG: JPEG, PNG → WebP 변환 및 압축 지원
	-	Cloudinary, ImageKit: 이미지 요청 시 WebP로 실시간 변환 가능

### 변환 예시 (CLI 기반)

- 기본 WebP 변환
```
cwebp -q 80 input.png -o output.webp
```

- 품질 낮추고 리사이징까지 함께 수행
```
cwebp -q 70 -resize 800 600 input.jpg -o resized.webp
```
	-	-q: 품질 설정 (0~100)
	-	-resize: 가로 세로 픽셀 크기 지정
	-	-m: 압축 방법 선택 (0~6, 숫자가 클수록 느리지만 압축률 증가)

### 품질(Q) vs 용량 Trade-off 튜닝

- 품질 설정 전략
  -	WebP는 JPEG보다 효율적인 압축 구조를 가지므로 Q70~80 사이에서도 눈에 띄는 화질 손상 없이 압축 가능
	-	Q값은 사용 목적과 이미지 특성에 따라 조절

- 이미지 유형	추천 Q값	설명
  - 제품 상세 이미지	85~90	고화질 유지 필요, 품질 우선
  - 콘텐츠 삽입 이미지	70~80	일반적 사용자 시야 내에서 무난한 품질
  - 썸네일/백그라운드	50~70	빠른 로딩 우선, 품질 저하 허용 가능

- 크기 조절 병행
  -	실제 웹 페이지에 필요한 디바이스별 최대 해상도 이하로 줄이는 것이 중요
	-	예: Retina 대응이 필요한 경우 2x 크기 기준 유지
	-	불필요한 초고해상도 이미지를 유지하면 WebP의 장점이 반감됨

### Best Practice
	-	용량 최소화 + 화질 유지라는 두 마리 토끼를 잡기 위해, 아래 전략을 권장
    - 핵심 이미지: Q80~90 + 최대 가로 1920px 이하
    - 부가 이미지: Q50~70 + 가로 800px 이하
    - 반복 사용 이미지(icon, bg): 무손실 WebP + 리사이징 필수

	-	변환 후에는 눈으로 품질 확인이 필수 (특히 텍스트 포함 이미지나 제품 사진은 체크 필요)
	-	Web 프로젝트에선 CI 파이프라인에 자동 변환 스크립트 삽입

- 폴더 내 일괄 변환 예시

```
mkdir webp_output
for file in *.png; do
  cwebp -q 75 "$file" -o "webp_output/${file%.png}.webp"
done
```


## 6. WebP 지원 이슈 및 대체 전략

###  WebP 지원 현황 (2025 기준)
- 지원 O: Chrome, Edge, Firefox, Safari 14+, Opera, Android Browser, 대부분의 Chromium 기반 브라우저
- 지원 X:
	- Internet Explorer 전 버전
	- Safari 13 이하 (macOS, iOS 포함)
	- 구형 Android WebView 일부 버전

### 구버전 브라우저 대응 전략

WebP가 지원되지 않는 환경에서는 **기존 포맷(JPEG, PNG)**을 자동으로 대체 제공하는 Fallback 전략이 필수다.

- <picture> 태그를 통한 Fallback

HTML5의 <picture> 태그는 브라우저가 지원하는 포맷을 자동으로 감지하여 출력하므로 가장 간편하고 직관적인 방식이다.

```
<picture>
  <source srcset="banner.webp" type="image/webp">
  <img src="banner.jpg" alt="배너 이미지">
</picture>
```
- 지원 브라우저: WebP → source 출력
- 비지원 브라우저: JPEG/PNG 등 → img 태그 출력

> <img>는 항상 fallback 역할이므로 alt 텍스트도 꼭 포함해야 접근성(Accessibility)에 유리함.

### Safari 구버전(13 이전) 대응
 - iOS 13 미만, macOS Catalina 미만의 Safari는 WebP 미지원
 - 이 경우에도 <picture> 방식으로 문제 해결 가능
- 단, 앱 내 WebView나 하이브리드 앱은 시스템 Safari 버전에 따라 제한될 수 있음

> 대안: iOS 버전 탐지 후 서버에서 JPEG 동적 서빙 or <noscript> 백업 이미지 제공

### Polyfill 사용 여부

예전에는 WebP 미지원 브라우저를 위해 JavaScript 기반 polyfill(예: Modernizr + JS 리렌더링) 사용이 고려됐지만, 2023년 이후에는 사실상 필요 없음.
- 대부분의 주요 브라우저가 WebP를 기본 지원
- <picture> 태그로 해결 가능
- JS로 동적 렌더링 시 SEO, UX 불리

> Polyfill은 유지/관리 복잡성 대비 효과가 크지 않으므로 사용 권장하지 않음.

### 서버 & 빌드 대응 전략

1. 서버 사이드 브라우저 감지 (Accept Header)

브라우저는 요청 시 아래와 같은 Accept 헤더를 전송:
```
Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8
```
- 서버에서 WebP를 지원하면 .webp 파일 응답
- 지원하지 않으면 JPEG/PNG 응답 (fallback)

실제 적용 사례:
- Nginx + try_files 디렉티브
- CDN (CloudFront, Cloudflare)에서 WebP 자동 감지 서빙

2. 정적 사이트 빌드시 fallback 이미지 동시 생성
- vite-imagetools, imagemin, gulp-webp 등을 사용해 .webp + .jpg 동시 출력
- srcset, <picture>와 함께 연결

### 실무 Best Practice 정리

상황 | 전략
--|--
대부분의 웹 앱 | .webp + <picture> 태그 fallback
SEO 민감한 서비스 | <picture> + 서버 감지 기반 WebP 서빙
정적 사이트 빌드 | WebP + JPG/PNG 자동 생성 및 동시 배포
WebView / 하이브리드 앱 | iOS 버전 탐지 및 조건부 fallback 제공
JS 기반 polyfill | ❌ (사실상 필요 없음)

## 7. WebP 이후의 대체 포맷 (미래 대비)

WebP는 오랫동안 차세대 이미지 포맷의 표준처럼 활용되었지만, 더 높은 압축률과 기능 확장을 요구하는 흐름 속에서 AVIF와 JPEG XL이라는 새로운 포맷이 주목받고 있다.
이들은 WebP의 단점을 보완하면서, 향후 웹 환경의 중심 포맷으로 자리 잡을 가능성이 있다.

### AVIF (AV1 Image File Format)

#### 개요
- AV1 비디오 코덱 기반의 정적 이미지 포맷
- Alliance for Open Media(AOMedia)에서 개발
- .avif 확장자 사용

#### 주요 특징
- WebP보다 약 30~50% 더 높은 압축률 제공
- 손실/무손실, 알파, HDR, 색심도(10bit), 와이드컬러 모두 지원
- 최신 브라우저 및 OS에서 지원 확대 중

#### 지원 현황 (2025 기준)
- ✅ Chrome, Edge, Firefox (최근 버전)
- ✅ Safari 16 이상 (iOS 16+, macOS Ventura+)
- ❌ 일부 Android WebView, 구형 Windows 브라우저는 미지원

#### 장점
- 압축률 업계 최고 수준
- HDR, 10bit, 와이드컬러 등 멀티미디어 대응 우수
- Netflix, YouTube, Apple 등에서 점진적 도입 중

#### 단점
- 인코딩 속도가 매우 느림 (CPU 집약적)
- 편집 도구, 라이브러리 생태계 미성숙
- AV1 기반이기 때문에 하드웨어 디코딩 지원 필요

> 실무 포인트: 초고화질 컨텐츠, 사진 서비스, 스트리밍 썸네일 등에 선제 적용 고려

### JPEG XL

#### 개요
- 기존 JPEG의 한계를 극복하기 위한 차세대 이미지 표준
- Google/Cloudinary/Swiss Federal Institute 주도
- .jxl 확장자 사용

#### 주요 특징
- 기존 JPEG와의 backward compatibility: .jpg → .jxl로 변환하면 기존 JPEG decoder에서도 일부 정보 사용 가능
- WebP2 프로젝트가 중단되며, JPEG XL이 사실상 계승 포맷이 됨

#### 지원 현황 (2025 기준)
- ✅ Firefox (실험적)
- 🔶 Chrome: 실험 플래그에서 제거 후 재검토 논의 중
- ❌ Safari 미지원
- 
> 일부 OS, 툴킷 지원은 시작되었지만 상용화 수준은 아님

#### 장점
- JPEG보다 60~70% 용량 감소
- 16bit 색상, 무손실, 알파, 애니메이션, progressive rendering 지원
- 전문가용 이미지, 프린트용 고해상도 등에서도 사용 가능

#### 단점
- 브라우저 지원이 불안정함
- Web 생태계 내 tooling, CDN, 인코더 미성숙

> 실무 포인트: 현재는 도입보다 기술 트렌드 관찰 및 보류 단계에 가까움

### WebP vs AVIF vs JPEG XL 요약 비교

항목 | WebP | AVIF | JPEG XL
--|--|--|--
기반 기술 | VP8 |	AV1 |	JPEG 계열
손실/무손실 | 지원 | 지원 |	지원
알파 지원 |지원 | 지원 | 지원
애니메이션 | 지원 | 지원 | 지원
압축률 | 보통 | 매우 우수 | 우수
인코딩 속도 | 빠름 | 느림 | 중간
브라우저 지원률 | 매우 높음 | 중간 → 증가 | 낮음
실무 적용 난이도 | 쉬움 | 보통 |어려움
도입 시점 | 현재 보편 | 차세대 선점 | 기술 검토 단계

## 8. WebP 도입 시 고려사항

WebP는 도입 자체는 간단하지만, 운영환경에서의 성능 극대화와 유지보수 효율을 위해 사전 고려할 항목이 많다. 단순히 포맷을 바꾸는 것을 넘어, SEO와 퍼포먼스, 브라우저 대응, 변환 전략까지 아울러야 효과를 극대화할 수 있다.

### 이미지 포맷 혼용 관리 전략

1. 전략적 포맷 혼용
	- WebP는 대부분 대체 가능하지만, 특수한 상황에선 JPEG/PNG 유지 필요
	- 픽셀 단위 디테일 요구 → PNG
	- 편집 가능성 고려 → JPEG
	- 브라우저 미지원 대응 → Fallback으로 JPEG/PNG 유지

2. 폴더 구조 또는 네이밍 규칙 적용
	- /images/webp/ vs /images/original/
	- 또는 banner.webp, banner.jpg 형식으로 병행 관리

3. 변환 자동화 및 빌드 파이프라인 통합
	- vite-imagetools, imagemin-webp, webpack-image-loader
	- 정적 사이트는 .webp + .jpg 동시 생성 및 <picture> 태그 대응

### SEO 최적화: 이미지 대응

#### srcset과 sizes 조합으로 Responsive 대응

```
<picture>
  <source srcset="img@2x.webp 2x, img.webp 1x" type="image/webp">
  <img src="img.jpg"
       srcset="img@2x.jpg 2x, img.jpg 1x"
       sizes="(max-width: 768px) 100vw, 50vw"
       alt="SEO 대응 이미지">
</picture>
```

	- 다양한 해상도 대응 (2x, 3x 등)
	- 모바일/데스크탑별 최적 이미지 서빙 가능
	- alt 태그는 접근성과 SEO 모두에 필수

### 퍼포먼스 측정 방법

도입 전/후 성능 비교를 통해 실제 개선 효과 확인 가능

도구 | 측정 항목
Lighthouse (Chrome) | LCP, FCP, CLS, 이미지 크기 확인
PageSpeed Insights | WebP 사용 권장 여부, lazy load 제안
Web Vitals | 실제 유저 데이터 기반 성능 지표

> 변환 시점 이후에는 반드시 Lighthouse 보고서 스냅샷을 저장해 두고, 도입 효과를 시각적으로 비교
