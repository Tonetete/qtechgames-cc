import { Volatility } from 'interfaces/Game';
import React from 'react'

export interface CardProps {
  title: string;
  image: string;
  date: string;
  volatility: Volatility;
  url: string;
}

export const Card = ({ title, image, date, url, volatility}: CardProps): React.ReactElement => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="mt-3 text-lg font-semibold">{title}</h2>
      <div className="mt-2 flex justify-between items-center text-sm">
        <span className="capitalize">{volatility}</span>
      </div>
      <p className="mt-2 text-xs text-gray-400">Released date: {date}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Play Demo
      </a>
    </div>
  );
}