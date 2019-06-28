import React from 'react'
import cuid from 'cuid'

import styled from 'styled-components'

import Proc from'./Proc'
import { Ops } from './Op/Ops'
import { Op } from './Op/Op';

const Container = styled.div`
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default function ProcOps ({
  modelId,
  ops,
  procs,
  upsertBatch
}) {
  // temporarily limited to only 1 technical process per batch
  return <>
    {[ops[0] || { id: cuid(), isNew: true }]
      .map((op, i) =>
        <Container
          key={op.id}
        >
          <Op
            op={op}
            opClass='SURVEY'
            opIndex={i}
            upsertBatch={upsertBatch}
          />
        </Container>
      )}
    {[procs[0] || { id: cuid(), isNew: true }]
      .map(proc =>
        <Container
          key={proc.id}
        >
          <Proc
            modelId={modelId}
            proc={proc}
            upsertBatch={upsertBatch}
          />
          {!proc.isNew &&
            <Ops
              ops={proc.ops}
              upsertBatch={upsertBatch}
            />
          }
        </Container>
      )}
  </>
}