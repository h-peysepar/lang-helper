import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'

function RotatableCard(props: { className?: string, word: string, definition?: string, ActionComponent: Function }) {
     const [state, setState] = useState(false)
     const rotateCard = () => setState(prev => !prev)
     return (
          <div className={`${props.className} bg-gray-50 mx-3 my-2 rounded-2xl items-center flex p-3 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60`}>
               <ReactCardFlip containerClassName={'self-stretch w-40 font-medium'} isFlipped={state} flipDirection="vertical" >
                    <div className='h-full flex items-center ml-2' onClick={rotateCard}>{props.word}</div>
                    <div className='h-full flex items-center ml-2' onClick={rotateCard}>{props.definition}</div>
               </ReactCardFlip>
               <span className='ml-auto inline-flex items-center'><props.ActionComponent/></span>
          </div>
     )
}


export default RotatableCard