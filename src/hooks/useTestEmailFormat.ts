//入力されたメールアドレスの形式の正誤を判定する関数
export const useTestEmailFormat = () => {
    const isValidEmailFormat = (email: string) => {
        const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

        return reg.test(email);
    };

    return { isValidEmailFormat };
};
