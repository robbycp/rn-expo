import React from 'react';
import {FlatList, View} from 'react-native';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';

import TextInputCustom from '~/components/basic/Form/TextInput';
import LoadingContent from '~/components/basic/Loading/LoadingContent';
import {useTodosGet} from '~/hooks/dataState/crud.hooks';
import {Todo} from '~/services/api/apiCrud';
import {useAppTheme} from '~/style/theme';

interface Props {
  formTodo: Todo;
  handleDeleteTodo: (id: string) => void;
  handleSubmitTodo: () => void;
  setFormTodo: React.Dispatch<React.SetStateAction<Todo>>;
  todosQuery: ReturnType<typeof useTodosGet>;
}

const TabCrudView = ({
  formTodo,
  handleDeleteTodo,
  handleSubmitTodo,
  setFormTodo,
  todosQuery,
}: Props) => {
  const theme = useAppTheme();
  return (
    <View>
      <View>
        <TextInputCustom
          nativeTextInputProps={{
            label: 'Description',
            onChangeText: text =>
              setFormTodo({
                ...formTodo,
                description: text,
              }),
            value: formTodo.description,
          }}
        />
        <Button onPress={handleSubmitTodo}>
          <Text>{formTodo._id ? 'Edit' : 'Add'}</Text>
        </Button>
      </View>
      <Title>List of Todo</Title>
      <LoadingContent isVisible={todosQuery.isLoading}>
        <FlatList
          data={todosQuery.data?.data || []}
          keyExtractor={item => `${item._id}`}
          renderItem={({item}) => (
            <Card mode="elevated" style={theme.spacing.mb8}>
              <Card.Title title={`ID : ${item._id}`} />
              <Card.Content>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button color={theme.colors.error} onPress={() => handleDeleteTodo(item._id)}>
                  Delete
                </Button>
                <Button onPress={() => setFormTodo(item)}>Update</Button>
              </Card.Actions>
            </Card>
          )}
        />
      </LoadingContent>
    </View>
  );
};

export default TabCrudView;
