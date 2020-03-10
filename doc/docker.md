# docker 教程

CentOs 系统

## 下载

- yum -y install docker-io
- docker -v 产看是否安装成功
- systemctl start docker 启动 docker
- docker info 查看 docker 信息

## docker 镜像加速

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://25jwdqcn.mirror.aliyuncs.com"]
}
EOF
sudo systemhctl daemon-reload
sudo systemctl restart docker
```

## image 镜像

- docker 把应用程序以及依赖，打包在 image 文件里面，只用通过这个文件才能生成 docker 容器。
- image 文件可以看作是容器的模板
- docker 依据 image 文件生成容器的实例
- 同一个 image 文件，可以生产多个同时运行的实例
- 一个 image 文件往往通过继承另一个 image 文件，加上一些个性化设置而生成

| 命令   | 含义             | 案例                         |
| ------ | ---------------- | ---------------------------- |
| images | 查看全部镜像     | docker image ls              |
| search | 查询镜像是否存在 | docker search \[image name\] |
| pull   | 拉取镜像         | docker pull \[image name\]   |
| rmi    | 删除镜像         | docker rmi \[image name\]    |

## container 容器

- `docker run`命令会从`image`文件，生成一个正在运行的容器实例
- `docker run`命令具有自动抓取 image 文件的功能，如果发现本地没有指定的 image 文件，会从仓库自动拉取
- 输出提示信息以后，hello-world 就会停止运行，容器自动终止
- 有些容器不会自动终止
- `image`文件生成的容器实例，本身也是一个文件，成为容器文件
- 容器生成，就会同时存在两个文件：`image`文件和`container`文件
- 关闭容器并不会删除容器文件，只是停止容器运行

| 命令    | 含义                                               | 案例                                              |
| ------- | -------------------------------------------------- | ------------------------------------------------- |
| run     | 启动容器                                           | docker run unbuntu /bin/echo "hello world\!"      |
| ps      | 查看容器                                           | docker ps 查看运行容器 docker ps \-a 查看所有容器 |
| start   | 启动一个容器                                       | docker start \[container id\]                     |
| stop    | 停止一个容器                                       | docker stop \[container id\]                      |
| restart | 重启容器                                           | docker restart \[container id\]                   |
| \-it    | 交互式，进入容器                                   | docker run \-it node /bin/bash                    |
| \-d     | 后台运行容器                                       | docker run \-d node                               |
| exec    | 进入一个正在运行的容器                             | docker exec \-it \[container id\] bash            |
| logs    | 查看容器的输出                                     | dokcer logs \[container id\]                      |
| cp      | 将主机文件拷贝到容器里，或者将容器里文件拷贝到主机 | dokcer cp \[container id\]:/\[filename\] \[path\] |

## 容器端口映射

将主机 `8888` 端口映射到 nginx `80` 端口

```bash
docker run -d -p 8888:80 nginx
```

## 制作个性化 image

在 Ubuntu 基础上添加了一个 hello.txt 文件

一个 commit 由以下部分组成

- commit 命令
- -m 提交信息
- -a 作者
- container id
- 容器名

```bash
docker commit -m 'add hello.txt' -a 'likai.tian' 3b2044
4fce75 likai.tain/hello
```

## docker file

查看镜像或容器

```
docker inspect ubuntu
```
