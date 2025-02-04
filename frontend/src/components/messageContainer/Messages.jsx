import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../skeletons/messageSkeleton';
import useListenMessage from '../../hooks/useListenMessage';

const Messages = () => {

	const {loading, messages} = useGetMessages();
	const lastMessageRef = useRef();
	useListenMessage();
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({behaviour: "smooth"});
		}, 100);
	}, [messages]);
  return (
    <div className='px-4 flex-1 overflow-auto'>
		

			{loading && ([...Array(5)].map((_, idx) => (
				<MessageSkeleton
				 key={idx}
				/>
				
			)))}

			{!loading && messages.length > 0 && (
				messages.map((message, idx) => (
					<div
						key={idx}
						ref={lastMessageRef}
					>
					<Message message={message}/>
					</div>
				))
			)}

			{!loading && messages.length === 0 && (
				<p className='text-center text-gray-300'>Send a message to start the conversation</p>
			)}
 		</div>
  )
}

export default Messages