/**
 * 导航页数据管理
 * 使用localStorage存储网站链接、分类和设置信息
 */

// 初始化数据
function initData() {
    // 检查是否有存储的数据，如果没有则创建默认数据
    if (!localStorage.getItem('navigationData')) {
        const defaultData = {
            // 网站分类和链接（所有分类统一归这里管理！）
            categories: [
                {
                    id: '1',
                    name: '快速访问',
                    icon: 'fa-rocket',
                    links: [
                        { id: 'quick_1', name: 'Google', url: 'https://www.google.com', icon: 'fa-google' },
                        { id: 'quick_2', name: 'GitHub', url: 'https://github.com', icon: 'fa-github' },
                        { id: 'quick_3', name: '微信', url: 'https://weixin.qq.com', icon: 'fa-weixin' },
                        { id: 'quick_4', name: 'QQ', url: 'https://qq.com', icon: 'fa-qq' }
                    ]
                },
                {
                    id: '2',
                    name: '常用网站',
                    icon: 'fa-link',
                    links: []
                },
                {
                    id: '3',
                    name: '源码网站',
                    icon: 'fa-code',
                    links: [
                        {
                            id: '1',
                            name: '阿乐源码网',
                            url: '#',
                            favicon: 'http://ale.leleyangyang.top:8991/wp-content/uploads/2022/06/1654508894-20b056292128543.png'
                        },
                        {
                            id: '2',
                            name: '阿乐源码网1',
                            url: '#',
                            favicon: 'http://ale.leleyangyang.top:8991/wp-content/uploads/2022/06/1654508894-20b056292128543.png'
                        },
                        {
                            id: '3',
                            name: '阿乐源码网2',
                            url: '#',
                            favicon: 'http://ale.leleyangyang.top:8991/wp-content/uploads/2022/06/1654508894-20b056292128543.png'
                        }
                    ]
                }
            ],
            
            // 联系信息
            contactInfo: {
                wechat: '888888',
                qq: '88888888'
            },
            
            // 主题设置
            themeSettings: {
                defaultTheme: 'auto', // auto, light, dark
                customBackground: false,
                backgroundImage: 'static/image/bjt.png'
            },
            
            // 搜索设置
            searchSettings: {
                defaultEngine: 'baidu', // baidu, google, bing
                customSearchUrl: ''
            }
        };
        
        localStorage.setItem('navigationData', JSON.stringify(defaultData));
    }
}

// 获取所有数据
function getAllData() {
    initData();
    return JSON.parse(localStorage.getItem('navigationData'));
}

// 保存所有数据
function saveAllData(data) {
    localStorage.setItem('navigationData', JSON.stringify(data));
}

// 获取分类和链接
function getCategories() {
    const data = getAllData();
    return data.categories || [];
}

// 保存分类和链接
function saveCategories(categories) {
    const data = getAllData();
    data.categories = categories;
    saveAllData(data);
}

// 添加分类
function addCategory(category) {
    const categories = getCategories();
    category.id = Date.now().toString();
    category.links = category.links || [];
    categories.push(category);
    saveCategories(categories);
    return category;
}

// 更新分类
function updateCategory(updatedCategory) {
    const categories = getCategories();
    const index = categories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
        categories[index] = updatedCategory;
        saveCategories(categories);
        return true;
    }
    return false;
}

// 删除分类
function deleteCategory(categoryId) {
    const categories = getCategories();
    const filtered = categories.filter(c => c.id !== categoryId);
    saveCategories(filtered);
}

// 添加链接到分类
function addLink(categoryId, link) {
    const categories = getCategories();
    const category = categories.find(c => c.id === categoryId);
    if (category) {
        link.id = Date.now().toString();
        category.links.push(link);
        saveCategories(categories);
        return link;
    }
    return null;
}

// 更新链接
function updateLink(categoryId, updatedLink) {
    const categories = getCategories();
    const category = categories.find(c => c.id === categoryId);
    if (category) {
        const index = category.links.findIndex(l => l.id === updatedLink.id);
        if (index !== -1) {
            category.links[index] = updatedLink;
            saveCategories(categories);
            return true;
        }
    }
    return false;
}

// 删除链接
function deleteLink(categoryId, linkId) {
    const categories = getCategories();
    const category = categories.find(c => c.id === categoryId);
    if (category) {
        category.links = category.links.filter(l => l.id !== linkId);
        saveCategories(categories);
        return true;
    }
    return false;
}

// 获取联系信息
function getContactInfo() {
    const data = getAllData();
    return data.contactInfo || { wechat: '', qq: '' };
}

// 保存联系信息
function saveContactInfo(contactInfo) {
    const data = getAllData();
    data.contactInfo = contactInfo;
    saveAllData(data);
}

// 获取主题设置
function getThemeSettings() {
    const data = getAllData();
    return data.themeSettings || {
        defaultTheme: 'auto',
        customBackground: false,
        backgroundImage: 'static/image/bjt.png'
    };
}

// 保存主题设置
function saveThemeSettings(themeSettings) {
    const data = getAllData();
    data.themeSettings = themeSettings;
    saveAllData(data);
}

// 获取搜索设置
function getSearchSettings() {
    const data = getAllData();
    return data.searchSettings || {
        defaultEngine: 'baidu',
        customSearchUrl: ''
    };
}

// 保存搜索设置
function saveSearchSettings(searchSettings) {
    const data = getAllData();
    data.searchSettings = searchSettings;
    saveAllData(data);
}

// 清空所有数据
function clearAllData() {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
        localStorage.removeItem('navigationData');
        return true;
    }
    return false;
}

// 导出数据
function exportData() {
    const data = getAllData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `navigation_data_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 导入数据
function importData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                if (data.categories && Array.isArray(data.categories)) {
                    saveAllData(data);
                    resolve(true);
                } else {
                    reject(new Error('无效的数据格式'));
                }
            } catch (error) {
                reject(new Error('导入失败：' + error.message));
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// 登录验证函数
function verifyLogin(username, password) {
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// 获取登录状态
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// 设置登录状态
function setLoggedIn(status) {
    if (status) {
        localStorage.setItem('adminLoggedIn', 'true');
    } else {
        localStorage.removeItem('adminLoggedIn');
    }
}

// 初始化数据
initData();
