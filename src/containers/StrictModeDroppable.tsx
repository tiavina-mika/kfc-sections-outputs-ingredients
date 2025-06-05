import { useEffect, useState } from "react"
import { Droppable } from "react-beautiful-dnd"

import type { DroppableProps, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd"

type Props = {
  children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement<HTMLElement>;
} & DroppableProps
/**
 * react-beautiful-dnd does not work with the React 18 Strict mode
 * this is a workaround from https://github.com/atlassian/react-beautiful-dnd/issues/2399
 */
const StrictModeDroppable = ({ children, ...props }: Props) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <Droppable {...props}>
      {(provided, snapshot) => children(provided, snapshot) as React.ReactElement<HTMLElement>}
    </Droppable>
  )
}

export default StrictModeDroppable
