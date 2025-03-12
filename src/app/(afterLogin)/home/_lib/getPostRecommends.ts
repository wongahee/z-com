// 1. (afterLogin/home/page.tsx) Home에서 getPostRecommends()가 실행되면 fetch로 backend api가 넘어감
// 2. res함수에 cache: 'force-cache'인 경우
// 두번째 사람이 다시 /home으로 요청을 보내면 backend로 넘어가지 않고, data-cache를 활용
// 2번 처럼 재사용되는 값(res.json)을 비활성화 하기 위해 revalidate, revalidatePath 사용

type Props = { 
  pageParam?: number 
};

export async function getPostRecommends({pageParam} : Props) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`, {
      next: {
        tags: ['posts', 'recommends']
      },
      cache: 'force-cache',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
  
    return res.json();
  }