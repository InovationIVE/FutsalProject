


// POST /api/match/save
export const matchEngine =(req, res) => {
  const { playerActions, result, timestamp } = req.body

  // 추후 DB 연동 가능
  console.log('Match Saved:', { timestamp, result })

  return res.status(200).json({ message: 'Saved successfully' })
}

