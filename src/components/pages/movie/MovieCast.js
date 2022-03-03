import React from 'react';
import { Image } from 'antd';
import { parsePersonFile } from '../../../helpers';
import femalePic from '../../../media/default-profile-female.jpg';
import malePic from '../../../media/default-profile-male.jpg';

function MovieCast({ cast, darkMode }) {
  return (
    <div className='rf-movie-cast-container'>
        {cast
          .filter(c => !!c.profile_path)
          .slice(0, 16)
          .map(cm => {
            return (
              <div key={cm.id} className='rf-movie-cast'>
                <div className='rf-movie-cast-image-container'>
                  <Image
                    src={parsePersonFile(cm.profile_path)}
                    fallback={cm.gender === 1 ? femalePic : malePic}
                    preview={false}
                    className='rf-movie-cast-image'
                  />
                </div>
                <div className='rf-movie-cast-name'>
                  {cm.name}
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default MovieCast;
