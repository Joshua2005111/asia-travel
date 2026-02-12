/**
 * 💬 ChinaMate - 论坛服务
 * 
 * 功能：
 * - 帖子发布/评论
 * - 话题分类
 * - 精华/热门帖子
 * - 用户关注
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translationAPI } from './TranslationAPI';

// 论坛服务
export const forumService = {
  /**
   * 获取话题分类
   */
  async getTopics(): Promise<ForumTopic[]> {
    const topics: ForumTopic[] = [
      {
        id: 'topic_shanghai',
        name: '上海攻略',
        nameEn: 'Shanghai Guide',
        nameKr: '상하이 가이드',
        icon: '🏙️',
        description: '上海旅游攻略、路线推荐',
        postCount: 1234,
        todayCount: 56,
      },
      {
        id: 'topic_food',
        name: '美食推荐',
        nameEn: 'Food Recommendations',
        nameKr: '음식 추천',
        icon: '🍜',
        description: '上海美食、餐厅测评',
        postCount: 2345,
        todayCount: 89,
      },
      {
        id: 'topic_view',
        name: '景点打卡',
        nameEn: 'Attractions',
        nameKr: '관광지',
        icon: '📸',
        description: '网红景点、拍照攻略',
        postCount: 3456,
        todayCount: 123,
      },
      {
        id: 'topic_experience',
        name: '体验分享',
        nameEn: 'Experiences',
        nameKr: '체험 공유',
        icon: '🎯',
        description: 'SPA、密室、DIY体验',
        postCount: 789,
        todayCount: 34,
      },
      {
        id: 'topic_qa',
        name: '问答求助',
        nameEn: 'Q&A',
        nameKr: '질문',
        icon: '❓',
        description: '旅行问题求助解答',
        postCount: 567,
        todayCount: 45,
      },
      {
        id: 'topic_deal',
        name: '优惠信息',
        nameEn: 'Deals',
        nameKr: '할인 정보',
        icon: '💰',
        description: '餐厅优惠、活动信息',
        postCount: 345,
        todayCount: 23,
      },
    ];

    return topics;
  },

  /**
   * 获取帖子列表
   */
  async getPosts(
    topicId?: string,
    sortBy: 'latest' | 'hot' | 'essence' = 'latest',
    page: number = 1
  ): Promise<PostList> {
    try {
      const posts: ForumPost[] = [
        {
          id: 'post_1',
          userId: 'user_1',
          username: '旅行达人',
          avatar: 'https://i.pravatar.cc/150?img=1',
          topicId: 'topic_shanghai',
          topicName: '上海攻略',
          title: '外滩夜景最佳观赏位置大公开！',
          content: '亲测多个位置，最佳观赏点分享...',
          images: [
            'https://images.unsplash.com/photo-1548567117-8278942325a5?w=400',
          ],
          likes: 234,
          comments: 45,
          views: 1234,
          isHot: true,
          isEssence: true,
          createdAt: '2026-02-10 10:30',
          tags: ['外滩', '夜景', '拍照'],
        },
        {
          id: 'post_2',
          userId: 'user_2',
          username: '美食家小王',
          avatar: 'https://i.pravatar.cc/150?img=2',
          topicId: 'topic_food',
          topicName: '美食推荐',
          title: '人均50的宝藏面馆推荐',
          content: '藏在弄堂里的本帮面馆，性价比超高...',
          images: [
            'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
          ],
          likes: 189,
          comments: 32,
          views: 890,
          isHot: true,
          isEssence: false,
          createdAt: '2026-02-10 09:15',
          tags: ['面馆', '本帮菜', '性价比'],
        },
      ];

      return {
        posts,
        total: 100,
        page,
        hasMore: true,
      };
    } catch (error) {
      console.error('Get posts error:', error);
      return { posts: [], total: 0, page: 1, hasMore: false };
    }
  },

  /**
   * 获取帖子详情
   */
  async getPostDetail(postId: string): Promise<ForumPost | null> {
    try {
      const post: ForumPost = {
        id: postId,
        userId: 'user_1',
        username: '旅行达人',
        avatar: 'https://i.pravatar.cc/150?img=1',
        topicId: 'topic_shanghai',
        topicName: '上海攻略',
        title: '外滩夜景最佳观赏位置大公开！',
        content: `📍 亲测多个位置，总结出最佳观赏攻略！

🏙️ 最佳位置推荐：
1. 北外滩 - 人少景美
2. 外白渡桥 - 经典机位
3. 浦东江边 - 视角独特

⏰ 最佳时间：
日落后30分钟-1小时

📸 拍照建议：
使用三脚架长曝光

大家还有什么好位置推荐吗？`,
        images: [
          'https://images.unsplash.com/photo-1548567117-8278942325a5?w=600',
        ],
        likes: 234,
        comments: 45,
        views: 1234,
        isHot: true,
        isEssence: true,
        createdAt: '2026-02-10 10:30',
        tags: ['外滩', '夜景', '拍照'],
      };

      return post;
    } catch (error) {
      console.error('Get post detail error:', error);
      return null;
    }
  },

  /**
   * 获取评论列表
   */
  async getComments(
    postId: string,
    page: number = 1
  ): Promise<ForumComment[]> {
    const comments: ForumComment[] = [
      {
        id: 'comment_1',
        postId,
        userId: 'user_3',
        username: '摄影爱好者',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: '收藏了！这周末就去！',
        likes: 12,
        createdAt: '2026-02-10 11:30',
        replies: [
          {
            id: 'reply_1',
            userId: 'user_1',
            username: '旅行达人',
            content: '记得带三脚架！夜景拍照必备',
            createdAt: '2026-02-10 11:45',
          },
        ],
      },
    ];

    return comments;
  },

  /**
   * 发布帖子
   */
  async createPost(
    topicId: string,
    title: string,
    content: string,
    images?: string[],
    tags?: string[]
  ): Promise<{ success: boolean; postId?: string }> {
    try {
      const postId = 'post_' + Date.now();

      // 添加积分
      const points = await AsyncStorage.getItem('userPoints');
      const newTotal = (points ? parseInt(points) : 0) + 20;
      await AsyncStorage.setItem('userPoints', String(newTotal));

      return { success: true, postId };
    } catch (error) {
      console.error('Create post error:', error);
      return { success: false };
    }
  },

  /**
   * 发布评论
   */
  async createComment(
    postId: string,
    content: string,
    replyTo?: string
  ): Promise<{ success: boolean; commentId?: string }> {
    try {
      const commentId = 'comment_' + Date.now();
      return { success: true, commentId };
    } catch (error) {
      console.error('Create comment error:', error);
      return { success: false };
    }
  },

  /**
   * 点赞帖子
   */
  async likePost(postId: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 关注用户
   */
  async followUser(userId: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 获取我的帖子
   */
  async getMyPosts(page: number = 1): Promise<ForumPost[]> {
    const posts: ForumPost[] = [];
    return posts;
  },

  /**
   * 获取我的收藏
   */
  async getMySavedPosts(page: number = 1): Promise<ForumPost[]> {
    const posts: ForumPost[] = [];
    return posts;
  },

  /**
   * 收藏帖子
   */
  async savePost(postId: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 获取热门帖子
   */
  async getHotPosts(): Promise<ForumPost[]> {
    const posts = await this.getPosts(undefined, 'hot');
    return posts.posts;
  },

  /**
   * 获取精华帖子
   */
  async getEssencePosts(): Promise<ForumPost[]> {
    const posts = await this.getPosts(undefined, 'essence');
    return posts.posts;
  },
};

// 类型定义
export interface ForumTopic {
  id: string;
  name: string;
  nameEn: string;
  nameKr: string;
  icon: string;
  description: string;
  postCount: number;
  todayCount: number;
}

export interface PostList {
  posts: ForumPost[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface ForumPost {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  topicId: string;
  topicName: string;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  views: number;
  isHot: boolean;
  isEssence: boolean;
  createdAt: string;
  tags: string[];
}

export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  createdAt: string;
  replies?: CommentReply[];
}

export interface CommentReply {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export default forumService;
