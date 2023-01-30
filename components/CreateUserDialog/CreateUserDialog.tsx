import { View } from "react-native";
import Dialog from "react-native-dialog";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/usersReducer";
import { User } from "../../types";
import createUser from "../../api/createUser";

export default function CreateUserDialog({
  visible,
  setShowUserDialog,
}: {
  visible: boolean;
  setShowUserDialog: (vis: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");

  const _createUser = async () => {
    const user: User = await createUser(username);
    dispatch(setCurrentUser(user));
    setShowUserDialog(false);
  };
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Set name</Dialog.Title>
        <Dialog.Input
          label="username"
          onChangeText={(_username: string) => setUsername(_username)}
        ></Dialog.Input>
        <Dialog.Button label="Create new user" onPress={_createUser} />
      </Dialog.Container>
    </View>
  );
}
