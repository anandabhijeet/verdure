
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb';

type Data = {
  name: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    res.status(405).end();
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.body.id },
      data: { anxiety_score: req.body.anxiety_score, depression_score:req.body.depression_score, stress_score:req.body.stress_score },
    });
  res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}