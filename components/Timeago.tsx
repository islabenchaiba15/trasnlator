'use client'
import React from 'react'
import TimeAgo from 'timeago-react';
function Timeago({ date }: { date: string | Date }) {
  return (
    <TimeAgo
  datetime={date}
/>
  )
}

export default Timeago