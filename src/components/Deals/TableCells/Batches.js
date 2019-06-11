import React from 'react'

import Batch from'./Batch'

export default function Batches ({
  deal,
  upsertDeal
}) {
  return [
    ...deal.batches,
    { id: 0 }
  ].map(batch =>
    <Batch
      key={batch.id}
      deal={deal}
      batch={batch}
      upsertDeal={upsertDeal}
    />
  )
}