from konlpy.tag import Okt 
# NLP 처리할 때 Konlpy 모듈 사용 (이하의 순서를 반드시 지켜야한다.)
# 1. JAVA 설치 후 환경변수 등록
# 2. 파이썬 버전 확인 후 Jpype 모듈 설치
# 3. tweepy 3.7.0 ~ 3.10.0 사이의 버전으로 설치
# 4. konlpy 설치

okt = Okt() # Okt 모듈을 사용하기 위한 처리

# 불용어 처리 (StopWords)
# https://github.com/hexists/test_konlpy.git [./stopwords/stopwords.word.txt] 사용
with open('./StopWords/stopwords.word.txt', 'r', encoding='UTF-8') as fp:
    stopwords_Lib = fp.readlines()

# 불용어 사전 리스트를 생성하기 위해서 단어의 끝에 붙은 줄바꿈 기호 제거
for ct in range(len(stopwords_Lib)):
    stopwords_Lib[ct] = stopwords_Lib[ct].rstrip('\n')

# konlpy에서 제공하는 불용어 사전의 단어를 제외하고 훈련 데이터를 직접 확인해보면서 빈도가 높은 커스텀 데이터 추가
stopwords = stopwords_Lib + ['도', '게', '만', '께', '는', '수', '은', '거', '고', '이니', '런가', '엔', '서']

# 불용어를 제외하고 문장을 단어 단위로 구분한 이차원 배열 리스트 생성
trainData = []
for sentence in train_data['Conv']: # 모든 훈련 데이터셋 Loop
    # Okt의 morphs 모듈을 사용하여 토큰화, 속성 중 stem을 이용하여 단어 정규화
    rootWord = okt.morphs(sentence, stem=True)
    rootWord = [word for word in rootWord if not word in stopwords] # 불용어 제거
    trainData.append(rootWord)