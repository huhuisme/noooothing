// src/utils/pointLoader.js

const imagesContext = require.context('@/assets/images/Tips', true, /\.(jpeg|jpg|png|gif)$/i)

function parseFileName(filename) {
    // 步骤图：支持多种格式
    // 格式1: "1抵住标点.jpeg" (数字直接跟描述)
    // 格式2: "1.抵住标点.jpeg" (数字点号描述)
    // 格式3: "1. 抵住标点.jpeg" (数字点号空格描述)
    let stepMatch = filename.match(/^(\d+)[\.\s]*\s*(.+?)\.(jpeg|jpg|png|gif)$/i)
    if (stepMatch) {
        return {
            type: 'step',
            stepNumber: parseInt(stepMatch[1]),
            description: stepMatch[2].trim(),
            extension: stepMatch[3]
        }
    }

    // 效果图格式: "效果图-回防a点眼1.jpeg" 或 "效果图-名称.jpeg"
    const effectMatch = filename.match(/^效果图-([^\.]+)\.(jpeg|jpg|png|gif)$/i)
    if (effectMatch) {
        return {
            type: 'effect',
            name: effectMatch[1].trim(),
            extension: effectMatch[2]
        }
    }

    // 兼容旧格式 "效果图-名称.jpg" 没有扩展名的情况
    const effectMatch2 = filename.match(/^效果图-(.+)$/i)
    if (effectMatch2 && !filename.match(/\./)) {
        return {
            type: 'effect',
            name: effectMatch2[1].trim(),
            extension: 'jpg'
        }
    }

    console.warn('未知类型文件:', filename)
    return { type: 'unknown' }
}

export function loadPointsData() {
    const pointsData = {}

    imagesContext.keys().forEach(key => {
        const pathParts = key.replace('./', '').split('/')
        if (pathParts.length < 5) {
            // 允许某些路径层级不足，但跳过
            return
        }

        const agent = pathParts[0]
        const map = pathParts[1]
        const side = pathParts[2]
        const pointName = pathParts[3]
        const filename = pathParts[4]

        const fileInfo = parseFileName(filename)

        if (!pointsData[agent]) pointsData[agent] = {}
        if (!pointsData[agent][map]) pointsData[agent][map] = { attack: [], defense: [] }
        const targetArray = side === '进攻' ? 'attack' : 'defense'

        let pointObj = pointsData[agent][map][targetArray].find(p => p.name === pointName)
        if (!pointObj) {
            pointObj = {
                id: `${agent}_${map}_${side}_${pointName}`.replace(/[^a-zA-Z0-9]/g, '_'),
                name: pointName,
                steps: [],
                effectImage: null
            }
            pointsData[agent][map][targetArray].push(pointObj)
        }

        const imagePath = imagesContext(key)

        if (fileInfo.type === 'effect') {
            pointObj.effectImage = { path: imagePath, name: fileInfo.name }
            console.log(`✅ 效果图: ${agent}/${map}/${side}/${pointName} -> ${filename}`)
        } else if (fileInfo.type === 'step') {
            pointObj.steps.push({
                stepNumber: fileInfo.stepNumber,
                description: fileInfo.description,
                image: imagePath,
            })
            console.log(`📸 步骤图: ${agent}/${map}/${side}/${pointName} - 步骤${fileInfo.stepNumber}: ${fileInfo.description}`)
        } else {
            console.warn(`❌ 未识别文件: ${filename}, 请检查命名`)
        }
    })

    // 排序
    for (const agent in pointsData) {
        for (const map in pointsData[agent]) {
            for (const type of ['attack', 'defense']) {
                pointsData[agent][map][type].forEach(point => {
                    point.steps.sort((a, b) => a.stepNumber - b.stepNumber)
                })
            }
        }
    }

    console.log('最终加载的点位数据:', pointsData)
    return pointsData
}