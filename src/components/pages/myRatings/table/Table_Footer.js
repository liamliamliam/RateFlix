import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

function Table_Footer({
  ratings_per_page,
  set_ratings_per_page,
  page_number,
  set_page_number,
  page_count
}) {
  const [rpp_list_open, set_rpp_list_open] = useState(false);

  const render_pagination = () => {
    const buttons = [];
    for (let i = 1; i < page_count + 1; i++) {
      buttons.push(
        <Button
          key={i}
          small
          text={i}
          active={i === page_number}
          onClick={() => set_page_number(i)}
          className='rf-myratings-pagination-button'
        />
      );
    }
    return buttons;
  };

  return (
    <tfoot>
      <tr>
        <td colSpan={7} className='ta-c'>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <ButtonGroup minimal className='ta-c'>
                {page_number > 1 && (
                  <Button
                    small
                    icon='chevron-left'
                    text='Previous'
                    onClick={() => set_page_number(page_number - 1)}
                  />
                )}
                {render_pagination()}
                {page_number < page_count && (
                  <Button
                    small
                    rightIcon='chevron-right'
                    text='Next'
                    onClick={() => set_page_number(page_number + 1)}
                  />
                )}
              </ButtonGroup>
            </Col>
            <Col span={4} className='ta-r'>
              <Popover2
                isOpen={rpp_list_open}
                placement='top-end'
                captureDismiss
                backdropProps={{
                  onClick: () => set_rpp_list_open(false)
                }}
                content={
                  <ButtonGroup minimal vertical>
                    {[10, 25, 50].map((rpp, i) => (
                      <Button
                        text={rpp}
                        intent={ratings_per_page === rpp ? 'primary' : ''}
                        key={i}
                        onClick={() => {
                          set_ratings_per_page(rpp);
                          set_rpp_list_open(false);
                        }}
                      />
                    ))}
                  </ButtonGroup>
                }
              >
                <Button
                  small
                  text={`${ratings_per_page}/Page`}
                  onClick={() => set_rpp_list_open(!rpp_list_open)}
                />
              </Popover2>
            </Col>
          </Row>
        </td>
      </tr>
    </tfoot>
  );
}

export default Table_Footer;
