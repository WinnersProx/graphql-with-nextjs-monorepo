// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  (res as any).cookie('custom-jt', 'dsdsdssd', {
    maxAge: 1000 * 60 * 60
});
  res.status(200).json({ name: 'John Doe' })
}
