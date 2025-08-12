export async function saveMatch(data) {
  const res = await fetch('http://localhost:4000/api/match/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error('저장 실패')
  return res.json()
}
