const partnerRequests = new Map<string, { count: number; time: number }>()

export const partnerRateLimiter = (
  req: any,
  res: any,
  next: any
) => {
  const partnerId = req.partner.id
  const limit = req.partner.rateLimitPerMin
  const now = Date.now()
  const windowMs = 60 * 1000

  const record = partnerRequests.get(partnerId)

  if (!record || now - record.time > windowMs) {
    partnerRequests.set(partnerId, { count: 1, time: now })
    return next()
  }

  if (record.count >= limit) {
    return res.status(429).json({
      message: 'Rate limit exceeded for partner'
    })
  }

  record.count++
  next()
}
