import * as React from 'react';
import {Container, Header} from '../../components';
import BookPage from '../../components/BookPage';

function BookScreen({navigation}) {
  return (
    <>
      <Container>
        <Header
          leftArrow="cross"
          transparent
          hasBackBtn
          title="Filters"
          onBackPress={() => navigation.goBack()}
          titleStyle={{
            fontSize: 24,
          }}
        />
        <BookPage />
      </Container>
    </>
  );
}

export default BookScreen;
