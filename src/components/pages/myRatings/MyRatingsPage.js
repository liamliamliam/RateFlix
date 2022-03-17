import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sub } from 'date-fns';
import { Row, Col } from 'antd';
import { Button, Divider } from '@blueprintjs/core';

import Score_Filter from './filters/Score_Filter';
import Year_Filter from './filters/Year_Filter';
import DateRange_Filter from './filters/DateRange_Filter';
import Table_Header from './table/Table_Header';
import Table_Footer from './table/Table_Footer';
import Table_Content from './table/Table_Content';
import Title_Filter from './filters/Title_Filter';

function MyRatingsPage() {
  const [all_ratings, set_all_ratings] = useState([]);
  const [filtered_ratings, set_filtered_ratings] = useState([]);
  const [render_ratings, set_render_ratings] = useState([]);

  const [title_query, set_title_query] = useState('');
  const [score_range, set_score_range] = useState([0, 10]);
  const [year_range, set_year_range] = useState([
    1888,
    new Date().getFullYear()
  ]);
  const [date_created_range, set_date_created_range] = useState([
    sub(new Date(), { years: 1 }),
    new Date()
  ]);
  const [date_modified_range, set_date_modified_range] = useState([
    sub(new Date(), { years: 1 }),
    new Date()
  ]);
  
  const [sort, set_sort] = useState({ field: 'score', asc: false });

  const [ratings_per_page, set_ratings_per_page] = useState(10);
  const [page_number, set_page_number] = useState(1);
  

  const load_ratings = async () => {
    const dcr = date_created_range.map(d => d.getTime());
    let url = '/api/myratings';
    // url += `?sr=${score_range.join(',')}`;
    // url += `&yr=${year_range.join(',')}`;
    // url += `&dcr=${date_created_range.map(d => d.toISOString()).join(',')}`;
    // url += `&dmr=${date_modified_range.map(d => d.toISOString()).join(',')}`;
    const res = await axios.get(url);
    set_all_ratings(res.data);
    //console.log('api/myratings - res.data:', res.data);
  };

  const filter_ratings = () => {
    set_page_number(1);
    let ratings = [...all_ratings];
    console.log('filter_ratings() - ratings:', ratings);
    if (title_query.length > 2) ratings = ratings.filter(r => r.movie.title.toLowerCase().indexOf(title_query.toLowerCase()) > -1);
    ratings = ratings.filter(
      r => r.score >= score_range[0] && r.score <= score_range[1]
    );
    ratings = ratings.filter(
      r => r.movie.year >= year_range[0] && r.movie.year <= year_range[1]
    );
    ratings = ratings.filter(
      r =>
        new Date(r.dateCreated) >= date_created_range[0] &&
        new Date(r.dateCreated) <= date_created_range[1]
    );
    ratings = ratings.filter(
      r =>
        new Date(r.dateModified) >= date_modified_range[0] &&
        new Date(r.dateModified) <= date_modified_range[1]
    );
    set_filtered_ratings(ratings);
  };

  const sort_ratings = () => {
    switch (sort.field) {
      case 'score':
        set_filtered_ratings(
          [...filtered_ratings].sort((a, b) =>
            sort.asc
              ? a[sort.field] - b[sort.field]
              : b[sort.field] - a[sort.field]
          )
        );
        break;
      case 'dateModified':
      case 'dateCreated':
        set_filtered_ratings(
          [...filtered_ratings].sort((a, b) =>
            sort.asc
              ? new Date(a[sort.field]) - new Date(b[sort.field])
              : new Date(b[sort.field]) - new Date(a[sort.field])
          )
        );
        break;
      case 'title':
        set_filtered_ratings(
          [...filtered_ratings].sort((a, b) => {
            if (!sort.asc)
              return a.movie.title < b.movie.title
                ? 1
                : a.movie.title > b.movie.title
                ? -1
                : 0;
            return a.movie.title > b.movie.title
              ? 1
              : a.movie.title < b.movie.title
              ? -1
              : 0;
          })
        );
        break;
      case 'year':
      case 'vote_average':
        set_filtered_ratings(
          [...filtered_ratings].sort((a, b) =>
            sort.asc
              ? a.movie[sort.field] - b.movie[sort.field]
              : b.movie[sort.field] - a.movie[sort.field]
          )
        );
        break;
    }
  };

  const render_page = () => {
    set_render_ratings(
      filtered_ratings.slice(
        (page_number - 1) * ratings_per_page,
        (page_number - 1) * ratings_per_page + ratings_per_page
      )
    );
  };

  useEffect(() => {
    load_ratings();
  }, []);
  useEffect(() => {
    filter_ratings();
  }, [title_query, score_range, year_range, date_created_range, date_modified_range]);
  useEffect(() => {
    filter_ratings();
  }, [all_ratings]);
  useEffect(() => {
    sort_ratings();
  }, [sort]);
  useEffect(() => {
    render_page();
  }, [filtered_ratings]);
  useEffect(() => {
    //console.log('page_number changed:', page_number);
    render_page();
  }, [page_number]);
  useEffect(() => {
    //console.log('ratings_per_page changed:', ratings_per_page);
    render_page();
    set_page_number(1);
  }, [ratings_per_page]);

  return (
    <div className='rf-page-container'>
      <Row>
        <Col span={24}>
          <div className='rf-page-title'>My Ratings</div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='rf-page-section'>
            <Row>
              <Col xs={24}>
                <div className='rf-myratings-filters'>
                  <Title_Filter query={title_query} onChange={set_title_query} />
                  <Divider />
                  <Score_Filter
                    range={score_range}
                    onChange={set_score_range}
                  />
                  <Divider />
                  <Year_Filter onChange={set_year_range} />
                  <Divider />
                  <DateRange_Filter
                    title='Date Created'
                    date_range={date_created_range}
                    onChange={set_date_created_range}
                  />
                  <Divider />
                  <DateRange_Filter
                    title='Date Modified'
                    date_range={date_modified_range}
                    onChange={set_date_modified_range}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <table className='rf-myratings-list'>
            <Table_Header sort={sort} set_sort={set_sort} />
            <Table_Content items={render_ratings} />
            <Table_Footer
              ratings_per_page={ratings_per_page}
              set_ratings_per_page={set_ratings_per_page}
              page_number={page_number}
              set_page_number={set_page_number}
              ratings_count={filtered_ratings.length}
            />
          </table>
        </Col>
      </Row>
    </div>
  );
}

export default MyRatingsPage;
