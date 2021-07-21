// 引数のイメージをもとに、ランダムなアルファベット・数字の組み合わせによりファイルネームを作成
export const useCreateFileName = () => {
    const createFileName = (image: File | null) => {
        const S =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(
            crypto.getRandomValues(new Uint32Array(N))
        )
            .map((n) => S[n % S.length])
            .join("");
        const fileName = randomChar + "_" + image?.name;
        return fileName;
    };
    return { createFileName };
};
