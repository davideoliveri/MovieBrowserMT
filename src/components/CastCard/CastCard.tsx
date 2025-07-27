import React from 'react';
import { CastMember } from '../../interfaces/CastMemberInterface';

interface CastCardProps {
  cast: CastMember;
}

export const CastCard: React.FC<CastCardProps> = (props): React.ReactNode => {
  return (
    <>
      {props.cast.profile_path && (
        <img
          className="movie-details__cast-member-photo"
          src={`https://image.tmdb.org/t/p/w185${props.cast.profile_path}`}
          alt={props.cast.name}
        />
      )}
      <div className="movie-details__cast-member-info">
        <p className="movie-details__cast-member-name">{props.cast.name}</p>
        {props.cast.character && (
          <p className="movie-details__cast-member-character">
            as {props.cast.character}
          </p>
        )}
      </div>
    </>
  );
};
