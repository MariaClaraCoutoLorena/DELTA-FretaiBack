import connectDatabase from '../db/database';

const { pool, loginUser, updatePassword, getTables, getDriverInfoByEmail, getPassengerInfoByEmail, getImagePathByUser, getUsersByDriverID, updatePay, getInviteUsersByDriverID, addUserEmailInvite } = connectDatabase();

//GET FUNCTIONS
async function driverInfo(email) {
    if (!email) {
        return { statusCode: 400, body: { error: 'Email é necessário' } };
    }
    
    const driverInfo = await getDriverInfoByEmail(email);
    
    if (!driverInfo) {
        return { statusCode: 404, body: { error: 'Motorista não encontrado' } };
    }
    
    return { statusCode: 200, body: driverInfo };
}


async function driverInvites(id) {
  if (!id) {
    return { statusCode: 400, body: { error: 'Id é necessário' } };
  }

  const inviteUsersInfo = await getInviteUsersByDriverID(id);

  if (!inviteUsersInfo) {
    return { statusCode: 404, body: { error: 'Passageiros convidados do motorista não encontrados' } };
  }

  return { statusCode: 200, body: inviteUsersInfo };

}


async function driverUsers(id) {
    if (!id) {
        return { statusCode: 400, body: { error: 'Id é necessário' } };
    }
    
    const usersDriverInfo = await getUsersByDriverID(id);
    
    if (!usersDriverInfo) {
        return { statusCode: 404, body: { error: 'Passageiros do motorista não encontrados' } };
    }
    
    return { statusCode: 200, body: usersDriverInfo };
}


async function imagePath(email) {
    if (!email) {
        return { statusCode: 400, body: { error: 'Email é necessário' } };
    }

    const imagePath = await getImagePathByUser(email);
    
    if (!imagePath) {
        return { statusCode: 404, body: { error: 'Imagem não encontrada' } };
    }
    return { statusCode: 200, body: { imagePath } };
}


async function login(email, password) {
    const user = await loginUser(email, password);

    if (user) {
      return { status: 'success', user };
    } else {
      return { status: 'error', message: 'Credenciais inválidas' };
    }

}


async function passengerInfo(email) {
  if (!email) {
    return { statusCode: 400, body: { error: 'Email é necessário' } };
  }

  const passengerInfo = await getPassengerInfoByEmail(email);

  if (!passengerInfo) {
    return { statusCode: 404, body: { error: 'Passageiro não encontrado' } };
  }

  return { statusCode: 200, body: passengerInfo };

}


async function tables() {
  const tables = await getTables();
  return tables;

}

//POST FUNCTIONS
async function addDriverInvite(email, id) {
    if (!email) {
      return { statusCode: 400, body: { error: 'Email é necessário' } };
    }
    if (id==null) {
      return { statusCode: 400, body: { error: 'Id do motorista é necessário' } };
    }

    const res = await addUserEmailInvite(email, id);
  
    if (!res) {
      return { statusCode: 404, body: { error: 'Não foi possivel atualizar os convites enviados' } };
    }

    return { statusCode: 200, body: { message: 'success' } };
}


async function changePassword(email, newPassword, confirmPassword) {
  if (newPassword !== confirmPassword) {
    return { status: 'error', message: 'As senhas não coincidem' };
  }

  const updateResult = await updatePassword(email, newPassword);

  if (updateResult) {
    return { status: 'success', message: 'Senha atualizada com sucesso' };
  } else {
    return { status: 'error', message: 'Usuário não encontrado ou erro ao atualizar senha' };
  }

}


async function updateUserPay(email, paid) {
  if (!email) {
    return { statusCode: 400, body: { error: 'Email é necessário' } };
  }
  if (paid==null) {
    return { statusCode: 400, body: { error: 'Confirmação de pagamento é necessário' } };
  }

  const res = await updatePay(email, paid);

  if (!res) {
    return { statusCode: 404, body: { error: 'Motorista não encontrado' } };
  }
  return { statusCode: 200, body: { message: 'success' } };
}

export {
    driverInfo,
    driverInvites,
    driverUsers,
    imagePath,
    login,
    passengerInfo,
    tables,
    addDriverInvite,
    changePassword,
    updateUserPay
}