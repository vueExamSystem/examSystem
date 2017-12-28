import Mock from 'mockjs';

const TypeList = [];

for (let i = 0; i < 3; i++) {
    TypeList.push(Mock.mock({
        id: i,
        name: `类型_${i}`,
    }));
}

export { TypeList };
