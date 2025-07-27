import React from 'react';
import { CastMember } from '../../interfaces/CastMemberInterface';
import PersonPlaceholder from '../../assets/images/placeholder-cast.svg';

interface CastCardProps {
  cast: CastMember;
}

export const CastCard: React.FC<CastCardProps> = (props): React.ReactNode => {
  const photoSrc = props.cast.profile_path
    ? `https://image.tmdb.org/t/p/w185${props.cast.profile_path}`
    : PersonPlaceholder;

  return (
    <>
      <img className="cast-card__photo" src={photoSrc} alt={props.cast.name} />
      <div className="cast-card__info">
        <p className="cast-card__name">{props.cast.name}</p>
        {props.cast.character && (
          <p className="cast-card__character">as {props.cast.character}</p>
        )}
      </div>
    </>
  );
};
