import React from 'react';

export interface CardProps {
  title: string;
  thumbnail: string;
  studio: string;
  rating: number;
  url: string;
}

export const Card = ({
  title,
  studio,
  thumbnail,
  url,
  rating,
}: CardProps): React.ReactElement => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="mt-3 text-lg font-semibold">{title}</h2>
      <section className="details">
        <div className="mt-2 flex justify-between items-center text-sm">
          <p className="text-gray-400">Studio: {studio}</p>
        </div>
        <div className="mt-2 flex justify-between items-center text-sm">
          <p className="text-gray-400">Rating: {rating}</p>
        </div>
      </section>
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
};
