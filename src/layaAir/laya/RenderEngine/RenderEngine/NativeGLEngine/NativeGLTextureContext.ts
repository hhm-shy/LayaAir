
import { WebGLExtension } from "../WebGLEngine/GLEnum/WebGLExtension";
import { NativeWebGLInternalTex } from "./NativeWebGLInternalTex";
import { NativeWebGLInternalRT } from "./NativeWebGLInternalRT";
import { FilterMode } from "../../RenderEnum/FilterMode";
import { RenderCapable } from "../../RenderEnum/RenderCapable";
import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { TextureDimension } from "../../RenderEnum/TextureDimension";
import { TextureFormat } from "../../RenderEnum/TextureFormat";
import { InternalTexture } from "../../RenderInterface/InternalTexture";
import { ITextureContext } from "../../RenderInterface/ITextureContext";
import { NativeGLObject } from "./NativeGLObject";
import { NativeWebGLEngine } from "./NativeWebGLEngine";
import { DDSTextureInfo } from "../../DDSTextureInfo";
import { HDRTextureInfo } from "../../HDRTextureInfo";
import { KTXTextureInfo } from "../../KTXTextureInfo";

export class NativeGLTextureContext extends NativeGLObject implements ITextureContext {
    protected _sRGB: any;
    protected _oesTextureHalfFloat: any;
    protected _compressdTextureS3tc_srgb: any;
    protected _compressedTextureEtc1: any;
    protected _compressedTextureS3tc: any;
    protected _compressedTextureETC: any;
    protected _compressedTextureASTC: any;
    protected _webgl_depth_texture: any;

    constructor(engine: NativeWebGLEngine) {
        super(engine);
        this._sRGB = this._engine._supportCapatable.getExtension(WebGLExtension.EXT_sRGB)
        this._oesTextureHalfFloat = this._engine._supportCapatable.getExtension(WebGLExtension.OES_texture_half_float)
        this._compressdTextureS3tc_srgb = this._engine._supportCapatable.getExtension(WebGLExtension.WEBGL_compressed_texture_s3tc_srgb)
        this._compressedTextureEtc1 = this._engine._supportCapatable.getExtension(WebGLExtension.WEBGL_compressed_texture_etc1)
        this._compressedTextureS3tc = this._engine._supportCapatable.getExtension(WebGLExtension.WEBGL_compressed_texture_s3tc)
        this._compressedTextureETC = this._engine._supportCapatable.getExtension(WebGLExtension.WEBGL_compressed_texture_etc)
        this._compressedTextureASTC = this._engine._supportCapatable.getExtension(WebGLExtension.WEBGL_compressed_texture_astc)
        this._webgl_depth_texture = this._engine._supportCapatable.getExtension(WebGLExtension.WEBGL_depth_texture);
    }

    _glParam: {
        internalFormat: number,
        format: number,
        type: number,
    } = {
            internalFormat: 0,
            format: 0,
            type: 0,
        };

    glTextureParam(format: TextureFormat, useSRGB: boolean) {
        let gl = this._gl;

        this._glParam.internalFormat = null;
        this._glParam.format = null;
        this._glParam.type = null;
        switch (format) {
            case TextureFormat.R8G8B8:
                this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_EXT : gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.R8G8B8A8:
                this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_ALPHA_EXT : gl.RGBA;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.R5G6B5:
                this._glParam.internalFormat = gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_SHORT_5_6_5;
                break;
            case TextureFormat.R32G32B32A32:
                this._glParam.internalFormat = gl.RGBA;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.FLOAT;
                break;
            case TextureFormat.R32G32B32:
                this._glParam.internalFormat = gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.FLOAT;
                break;
            case TextureFormat.R16G16B16A16:
                this._glParam.internalFormat = gl.RGBA;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                break;
            case TextureFormat.R16G16B16:
                this._glParam.internalFormat = gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                break;
            case TextureFormat.DXT1:
                this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.DXT3:
                this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.DXT5:
                this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ETC1RGB:
                this._glParam.internalFormat = this._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ETC2RGBA:
                this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGBA8_ETC2_EAC;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ETC2RGB:
                this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGB8_ETC2;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ETC2SRGB:
                this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_ETC2;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ETC2SRGB_Alpha8:
                this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ASTC4x4:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_4x4_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ASTC6x6:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_6x6_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break
            case TextureFormat.ASTC8x8:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_8x8_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break
            case TextureFormat.ASTC10x10:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_10x10_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break
            case TextureFormat.ASTC12x12:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_12x12_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break
            case TextureFormat.ASTC4x4SRGB:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ASTC6x6SRGB:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ASTC8x8SRGB:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ASTC10x10SRGB:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case TextureFormat.ASTC12x12SRGB:
                this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            default:
                throw "Unknown Texture Format.";
        }

        return this._glParam;
    }

    // todo srgb ?
    glRenderTextureParam(format: RenderTargetFormat, useSRGB: boolean) {
        let gl = this._gl;

        this._glParam.internalFormat = null;
        this._glParam.format = null;
        this._glParam.type = null;

        switch (format) {
            case RenderTargetFormat.R8G8B8:
                this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_EXT : gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case RenderTargetFormat.R8G8B8A8:
                this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_EXT : gl.RGBA;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_BYTE;
                break;
            case RenderTargetFormat.R16G16B16:
                this._glParam.internalFormat = gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                break;
            case RenderTargetFormat.R16G16B16A16:
                this._glParam.internalFormat = gl.RGBA;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                break;
            case RenderTargetFormat.R32G32B32:
                this._glParam.internalFormat = gl.RGB;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.FLOAT;
                break;
            case RenderTargetFormat.R32G32B32A32:
                this._glParam.internalFormat = gl.RGBA;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.FLOAT;
                break;
            case RenderTargetFormat.DEPTH_16:
                this._glParam.internalFormat = gl.DEPTH_COMPONENT;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_SHORT;
                break;
            case RenderTargetFormat.DEPTHSTENCIL_24_8:
                this._glParam.internalFormat = gl.DEPTH_STENCIL;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = this._webgl_depth_texture.UNSIGNED_INT_24_8_WEBGL;
                break;
            case RenderTargetFormat.DEPTH_32:
                this._glParam.internalFormat = gl.DEPTH_COMPONENT;
                this._glParam.format = this._glParam.internalFormat;
                this._glParam.type = gl.UNSIGNED_INT;
                break;
            case RenderTargetFormat.STENCIL_8:
            default:
                throw "render texture format wrong."
        }

        return this._glParam;
    }

    glRenderBufferParam(format: RenderTargetFormat, useSRGB: boolean) {
        // todo
        let gl = this._gl;
        switch (format) {
            case RenderTargetFormat.DEPTH_16:
                return { internalFormat: gl.DEPTH_COMPONENT16, attachment: gl.DEPTH_ATTACHMENT };
            case RenderTargetFormat.DEPTHSTENCIL_24_8:
                return { internalFormat: gl.DEPTH_STENCIL, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
            case RenderTargetFormat.DEPTH_32:
                return { internalFormat: gl.DEPTH_STENCIL, attachment: gl.DEPTH_ATTACHMENT };
            case RenderTargetFormat.STENCIL_8:
                return { internalFormat: gl.STENCIL_INDEX8, attachment: gl.STENCIL_ATTACHMENT };
            default:
                return null;
        }
    }

    glRenderTargetAttachment(format: RenderTargetFormat) {
        let gl = this._gl;
        switch (format) {
            case RenderTargetFormat.DEPTH_16:
                return gl.DEPTH_ATTACHMENT;
            case RenderTargetFormat.DEPTHSTENCIL_24_8:
                return gl.DEPTH_STENCIL_ATTACHMENT;
            case RenderTargetFormat.DEPTH_32:
                return gl.DEPTH_ATTACHMENT;
            case RenderTargetFormat.STENCIL_8:
                return gl.STENCIL_ATTACHMENT;
            case RenderTargetFormat.R8G8B8:
            case RenderTargetFormat.R8G8B8A8:
            case RenderTargetFormat.R16G16B16:
            case RenderTargetFormat.R16G16B16A16:
            case RenderTargetFormat.R32G32B32:
            case RenderTargetFormat.R32G32B32A32:
                return gl.COLOR_ATTACHMENT0;
            default:
                throw "render format."
        }
    }

    protected getTarget(dimension: TextureDimension) {
        let gl = this._gl;
        switch (dimension) {
            case TextureDimension.Tex2D:
                return gl.TEXTURE_2D;
            case TextureDimension.Cube:
                return gl.TEXTURE_CUBE_MAP;
            default:
                throw "texture dimension wrong in WebGL1."
        }
    }

    // protected getRenderTargetDepthFormat(format: RenderTargetDepthFormat): { internalFormat: number, attachment: number } {
    //     let gl = this.gl;
    //     switch (format) {
    //         case RenderTargetDepthFormat.DEPTH_16:
    //             return { internalFormat: gl.DEPTH_COMPONENT16, attachment: gl.DEPTH_ATTACHMENT };
    //         case RenderTargetDepthFormat.DEPTHSTENCIL_24_8:
    //             return { internalFormat: gl.DEPTH_STENCIL, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
    //         case RenderTargetDepthFormat.DEPTH_32:
    //             return { internalFormat: gl.DEPTH_STENCIL, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
    //         case RenderTargetDepthFormat.STENCIL_8:
    //             return { internalFormat: gl.STENCIL_INDEX8, attachment: gl.STENCIL_ATTACHMENT };
    //         case RenderTargetDepthFormat.DEPTHSTENCIL_NONE:
    //             return null;
    //         default:
    //             throw "RenderTargetDepthFormat wrong."
    //     }
    // }

    /**
     * 根据 format 判断是否支持 SRGBload
     * @param format 
     * @returns 
     */
    supportSRGB(format: TextureFormat | RenderTargetFormat, mipmap: boolean): boolean {
        switch (format) {
            case TextureFormat.R8G8B8:
            case TextureFormat.R8G8B8A8:
                return this._engine.getCapable(RenderCapable.Texture_SRGB) && !mipmap;
            case TextureFormat.DXT1:
            case TextureFormat.DXT3:
            case TextureFormat.DXT5:
                // todo  验证 srgb format 和 mipmap webgl1 兼容问题
                return this._engine.getCapable(RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB) && !mipmap;
            default:
                return false;
        }
    }

    supportGenerateMipmap(format: TextureFormat | RenderTargetFormat) {
        switch (format) {
            case RenderTargetFormat.DEPTH_16:
            case RenderTargetFormat.DEPTHSTENCIL_24_8:
            case RenderTargetFormat.DEPTH_32:
            case RenderTargetFormat.STENCIL_8:
                return false;
            default:
                return true;
        }
    }

    /**
     * 判断 纹理格式 本身是否是 SRGB格式
     * @param format 
     * @returns 
     */
    isSRGBFormat(format: TextureFormat | RenderTargetFormat) {
        switch (format) {
            case TextureFormat.ETC2SRGB:
            case TextureFormat.ETC2SRGB_Alpha8:
            case TextureFormat.ASTC4x4SRGB:
            case TextureFormat.ASTC6x6SRGB:
            case TextureFormat.ASTC8x8SRGB:
            case TextureFormat.ASTC10x10SRGB:
            case TextureFormat.ASTC12x12SRGB:
                return true;
            default:
                return false;
        }
    }

    createTextureInternal(dimension: TextureDimension, width: number, height: number, format: TextureFormat, gengerateMipmap: boolean, sRGB: boolean): InternalTexture {

        // todo  一些format 不支持自动生成mipmap

        // todo  这个判断, 若纹理本身格式不支持？
        let useSRGBExt = this.isSRGBFormat(format) || (sRGB && this.supportSRGB(format, gengerateMipmap));

        let gammaCorrection = 1.0;
        if (!useSRGBExt && sRGB) {
            gammaCorrection = 2.2;
        }

        // let dimension = TextureDimension.Tex2D;
        let target = this.getTarget(dimension);
        let internalTex = new  NativeWebGLInternalTex(this._engine, target, width, height, dimension, gengerateMipmap, useSRGBExt, gammaCorrection);

        let glParam = this.glTextureParam(format, useSRGBExt);

        internalTex.internalFormat = glParam.internalFormat;
        internalTex.format = glParam.format;
        internalTex.type = glParam.type;

        return internalTex;
    }

    setTextureImageData(texture: NativeWebGLInternalTex, source: HTMLImageElement | HTMLCanvasElement | ImageBitmap, premultiplyAlpha: boolean, invertY: boolean) {

        if (texture.width != source.width || texture.height != source.height) {
            // todo ?
            console.warn("setTextureImageData: size not match");
        }

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let width = texture.width;
        let height = texture.height;

        let gl = texture._gl;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        this._engine._bindTexture(texture.target, texture.resource);

        gl.texImage2D(target, 0, internalFormat, format, type, source);

        // gl.texImage2D(target, 0, internalFormat, width, height, 0, format, type, null);
        // gl.texSubImage2D(target, 0, 0, 0, format, type, source);

        if (texture.mipmap) {
            gl.generateMipmap(texture.target);
        }
        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    }

    setTexturePixelsData(texture: NativeWebGLInternalTex, source: ArrayBufferView, premultiplyAlpha: boolean, invertY: boolean) {
        // todo check pixels size

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let width = texture.width;
        let height = texture.height;

        let fourSize = width % 4 == 0 && height % 4 == 0;

        let gl = texture._gl;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        // gl.texImage2D(target, 0, internalFormat, format, type, source);

        gl.texImage2D(target, 0, internalFormat, width, height, 0, format, type, source);
        // gl.texSubImage2D(target, 0, 0, 0, format, type, source);

        if (texture.mipmap) {
            gl.generateMipmap(texture.target);
        }
        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setTextureSubPixelsData(texture: NativeWebGLInternalTex, source: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, width: number, height: number, premultiplyAlpha: boolean, invertY: boolean): void {

        generateMipmap = generateMipmap && mipmapLevel == 0;

        // todo check pixels size

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        // let width = texture.width;
        // let height = texture.height;

        let fourSize = width % 4 == 0 && height % 4 == 0;

        let gl = texture._gl;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        // gl.texImage2D(target, 0, internalFormat, format, type, null);

        // gl.texImage2D(target, 0, internalFormat, width, height, 0, format, type, source);
        gl.texSubImage2D(target, mipmapLevel, xOffset, yOffset, width, height, format, type, source);

        if (texture.mipmap && generateMipmap) {
            gl.generateMipmap(texture.target);
        }
        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setTextureDDSData(texture: NativeWebGLInternalTex, ddsInfo: DDSTextureInfo) {
        //todo?
        let premultiplyAlpha = false;
        let invertY = false;

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        // todo texture size 与 ddsInfo size
        let width = texture.width;
        let height = texture.height;

        let source = ddsInfo.source;
        let dataOffset = ddsInfo.dataOffset;
        let bpp = ddsInfo.bpp;
        let blockBytes = ddsInfo.blockBytes;
        let mipmapCount = ddsInfo.mipmapCount;

        let fourSize = width % 4 == 0 && height % 4 == 0;

        let gl = texture._gl;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        let mipmapWidth = width;
        let mipmapHeight = height;
        for (let index = 0; index < mipmapCount; index++) {

            // todo  size 计算 方式
            let dataLength = Math.max(4, mipmapWidth) / 4 * Math.max(4, mipmapHeight) / 4 * blockBytes;
            let sourceData = new Uint8Array(source, dataOffset, dataLength);

            gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);

            dataOffset += bpp ? (mipmapWidth * mipmapHeight * (bpp / 8)) : dataLength;

            mipmapWidth *= 0.5;
            mipmapHeight *= 0.5;
            mipmapWidth = Math.max(1.0, mipmapWidth);
            mipmapHeight = Math.max(1.0, mipmapHeight);
        }

        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setTextureKTXData(texture: NativeWebGLInternalTex, ktxInfo: KTXTextureInfo) {

        //todo?
        let premultiplyAlpha = false;
        let invertY = false;

        let source = ktxInfo.source;
        let compressed = ktxInfo.compress;

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let mipmapCount = texture.mipmapCount;
        // todo texture size 与 ddsInfo size
        let width = texture.width;
        let height = texture.height;

        let fourSize = width % 4 == 0 && height % 4 == 0;

        let gl = texture._gl;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        let mipmapWidth = width;
        let mipmapHeight = height;
        let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
        for (let index = 0; index < mipmapCount; index++) {
            let imageSize = new Int32Array(source, dataOffset, 1)[0];

            dataOffset += 4;
            // todo  cube 在一起？

            let sourceData = new Uint8Array(source, dataOffset, imageSize);

            compressed && gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
            !compressed && gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, sourceData);

            dataOffset += imageSize;
            dataOffset += 3 - ((imageSize + 3) % 4);

            mipmapWidth = Math.max(1, mipmapWidth * 0.5);
            mipmapHeight = Math.max(1, mipmapHeight * 0.5);
        }

        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setTextureHDRData(texture: NativeWebGLInternalTex, hdrInfo: HDRTextureInfo): void {
        //todo?
        let premultiplyAlpha = false;
        let invertY = false;

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let mipmapCount = texture.mipmapCount;
        // todo texture size 与 ddsInfo size
        let width = texture.width;
        let height = texture.height;

        // let hdrPixelData = hdrInfo.get_32_bit_rle_rgbe();
        let hdrPixelData = hdrInfo.readScanLine();

        let fourSize = width % 4 == 0 && height % 4 == 0;
        let gl = texture._gl;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        gl.texImage2D(target, 0, internalFormat, width, height, 0, format, type, hdrPixelData);

        if (mipmapCount > 1) {
            gl.generateMipmap(target);
        }

        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setCubeImageData(texture: NativeWebGLInternalTex, sources: HTMLImageElement[] | HTMLCanvasElement[] | ImageBitmap[], premultiplyAlpha: boolean, invertY: boolean) {

        let gl = texture._gl;

        const cubeFace = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // back
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // front
            gl.TEXTURE_CUBE_MAP_POSITIVE_X, // right
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // left
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
        ]

        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let width = texture.width;
        let height = texture.height;

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        this._engine._bindTexture(texture.target, texture.resource);

        for (let index = 0; index < cubeFace.length; index++) {
            let target = cubeFace[index];
            gl.texImage2D(target, 0, internalFormat, format, type, sources[index]);
        }

        if (texture.mipmap) {
            gl.generateMipmap(texture.target);
        }
        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    }

    setCubePixelsData(texture: NativeWebGLInternalTex, source: ArrayBufferView[], premultiplyAlpha: boolean, invertY: boolean) {
        let gl = texture._gl;

        const cubeFace = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // back
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // front
            gl.TEXTURE_CUBE_MAP_POSITIVE_X, // right
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // left
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
        ]

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let width = texture.width;
        let height = texture.height;

        let fourSize = width % 4 == 0;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);
        if (source) {
            for (let index = 0; index < cubeFace.length; index++) {
                let t = cubeFace[index];
                // gl.texImage2D(t, 0, internalFormat, format, type, sources[index]);
                gl.texImage2D(t, 0, internalFormat, width, height, 0, format, type, source[index]);
            }
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
        }
        else {
            for (let index = 0; index < cubeFace.length; index++) {
                let t = cubeFace[index];
                // gl.texImage2D(t, 0, internalFormat, format, type, sources[index]);
                gl.texImage2D(t, 0, internalFormat, width, height, 0, format, type, null);
            }
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
        }
        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setCubeSubPixelData(texture: NativeWebGLInternalTex, source: ArrayBufferView[], mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, width: number, height: number, premultiplyAlpha: boolean, invertY: boolean): void {

        generateMipmap = generateMipmap && mipmapLevel == 0;

        let gl = texture._gl;

        const cubeFace = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // back
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // front
            gl.TEXTURE_CUBE_MAP_POSITIVE_X, // right
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // left
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
        ];

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;

        let fourSize = width % 4 == 0;
        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        for (let index = 0; index < cubeFace.length; index++) {
            let target = cubeFace[index];
            // gl.texImage2D(target, 0, internalFormat, format, type, sources[index]);
            gl.texSubImage2D(target, mipmapLevel, xOffset, yOffset, width, height, format, type, source[index]);
        }

        if (texture.mipmap && generateMipmap) {
            gl.generateMipmap(texture.target);
        }
        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }


    setCubeDDSData(texture: NativeWebGLInternalTex, ddsInfo: DDSTextureInfo) {
        //todo?
        let premultiplyAlpha = false;
        let invertY = false;

        // let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let width = texture.width;
        let height = texture.height;

        let source = ddsInfo.source;
        let dataOffset = ddsInfo.dataOffset;
        let bpp = ddsInfo.bpp;
        let blockBytes = ddsInfo.blockBytes;
        let mipmapCount = ddsInfo.mipmapCount;

        let fourSize = width % 4 == 0 && height % 4 == 0;

        let gl = texture._gl;

        // dds 标准顺序
        const cubeFace = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_X, // right
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // left
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // back
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // front
        ]

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        for (let face = 0; face < 6; face++) {

            let mipmapWidth = width;
            let mipmapHeight = height;

            let target = cubeFace[face];

            for (let index = 0; index < mipmapCount; index++) {

                let dataLength = Math.max(4, mipmapWidth) / 4 * Math.max(4, mipmapHeight) / 4 * blockBytes;

                let sourceData = new Uint8Array(source, dataOffset, dataLength);

                (texture.mipmap || index == 0) && gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);

                dataOffset += bpp ? (mipmapWidth * mipmapHeight * (bpp / 8)) : dataLength;

                mipmapWidth *= 0.5;
                mipmapHeight *= 0.5;
                mipmapWidth = Math.max(1.0, mipmapWidth);
                mipmapHeight = Math.max(1.0, mipmapHeight);
            }
        }

        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setCubeKTXData(texture: NativeWebGLInternalTex, ktxInfo: KTXTextureInfo) {
        //todo?
        let premultiplyAlpha = false;
        let invertY = false;

        let source = ktxInfo.source;
        let compressed = ktxInfo.compress;

        // let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let mipmapCount = texture.mipmapCount;
        // todo texture size 与 ddsInfo size
        let width = texture.width;
        let height = texture.height;

        let fourSize = width % 4 == 0 && height % 4 == 0;

        let gl = texture._gl;

        // ktx 标准顺序
        const cubeFace = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_X, // right
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // left
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // back
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // front
        ]

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        this._engine._bindTexture(texture.target, texture.resource);

        let mipmapWidth = width;
        let mipmapHeight = height;
        let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;

        for (let index = 0; index < mipmapCount; index++) {
            let imageSize = new Int32Array(source, dataOffset, 1)[0];

            dataOffset += 4;
            // todo  cube 在一起？

            for (let face = 0; face < 6; face++) {
                let target = cubeFace[face];
                let sourceData = new Uint8Array(source, dataOffset, imageSize);

                compressed && gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);

                !compressed && gl.texImage2D(target, index, internalFormat, width, height, 0, format, type, sourceData);

                dataOffset += imageSize;
                dataOffset += 3 - ((imageSize + 3) % 4);
            }


            mipmapWidth = Math.max(1, mipmapWidth * 0.5);
            mipmapHeight = Math.max(1, mipmapHeight * 0.5);
        }

        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

    setTextureCompareMode(texture: NativeWebGLInternalTex, compareMode: TextureCompareMode): TextureCompareMode {
        return TextureCompareMode.None;
    }

    bindRenderTarget(renderTarget: NativeWebGLInternalRT): void {
        let gl = this._gl;
        let framebuffer = renderTarget._framebuffer;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        if (renderTarget._isCube) {
            let texture = <NativeWebGLInternalTex>renderTarget._textures[0];
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, texture.resource, 0);
        }

    }

    bindoutScreenTarget():void{
        let gl = this._gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    unbindRenderTarget(renderTarget: NativeWebGLInternalRT): void {
        let gl = renderTarget._gl;

        if (renderTarget._generateMipmap) {
            renderTarget._textures.forEach(tex => {
                let target = (<NativeWebGLInternalTex>tex).target;
                this._engine._bindTexture(target, tex.resource);
                gl.generateMipmap(target);
                this._engine._bindTexture(target, null);
            });
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    createRenderTextureInternal(dimension: TextureDimension, width: number, height: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): NativeWebGLInternalTex {
        let useSRGBExt = false;

        generateMipmap = generateMipmap && this.supportGenerateMipmap(format);

        let gammaCorrection = 1.0;
        if (!useSRGBExt && sRGB) {
            gammaCorrection = 2.2;
        }

        // let dimension = TextureDimension.Tex2D;
        let target = this.getTarget(dimension);
        let internalTex = new NativeWebGLInternalTex(this._engine, target, width, height, dimension, generateMipmap, useSRGBExt, gammaCorrection);

        let glParam = this.glRenderTextureParam(format, useSRGBExt);

        internalTex.internalFormat = glParam.internalFormat;
        internalTex.format = glParam.format;
        internalTex.type = glParam.type;

        let internalFormat = internalTex.internalFormat;
        let glFormat = internalTex.format;
        let type = internalTex.type;

        let gl = internalTex._gl;

        this._engine._bindTexture(internalTex.target, internalTex.resource);

        gl.texImage2D(target, 0, internalFormat, width, height, 0, glFormat, type, null);

        this._engine._bindTexture(internalTex.target, null);

        if (format == RenderTargetFormat.DEPTH_16 || format == RenderTargetFormat.DEPTH_32 || format == RenderTargetFormat.DEPTHSTENCIL_24_8) {
            internalTex.filterMode = FilterMode.Point;
        }

        return internalTex;
    }

    createRenderTextureCubeInternal(dimension: TextureDimension, size: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): NativeWebGLInternalTex {
        let useSRGBExt = false;

        generateMipmap = generateMipmap && this.supportGenerateMipmap(format);

        let gammaCorrection = 1.0;
        if (!useSRGBExt && sRGB) {
            gammaCorrection = 2.2;
        }

        let target = this.getTarget(dimension);
        let internalTex = new NativeWebGLInternalTex(this._engine, target, size, size, dimension, generateMipmap, useSRGBExt, gammaCorrection);

        let glParam = this.glRenderTextureParam(format, useSRGBExt);

        internalTex.internalFormat = glParam.internalFormat;
        internalTex.format = glParam.format;
        internalTex.type = glParam.type;

        let internalFormat = internalTex.internalFormat;
        let glFormat = internalTex.format;
        let type = internalTex.type;

        let gl = internalTex._gl;
        const cubeFace = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // back
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // front
            gl.TEXTURE_CUBE_MAP_POSITIVE_X, // right
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // left
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
        ]

        this._engine._bindTexture(internalTex.target, internalTex.resource);

        for (let index = 0; index < cubeFace.length; index++) {
            let target = cubeFace[index];
            gl.texImage2D(target, 0, internalFormat, size, size, 0, glFormat, type, null);

        }
        this._engine._bindTexture(internalTex.target, null);

        if (format == RenderTargetFormat.DEPTH_16 || format == RenderTargetFormat.DEPTH_32 || format == RenderTargetFormat.DEPTHSTENCIL_24_8) {
            internalTex.filterMode = FilterMode.Point;
        }

        return internalTex;
    }

    createRenderTargetInternal(width: number, height: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): NativeWebGLInternalRT {
        multiSamples = 1;

        let texture = this.createRenderTextureInternal(TextureDimension.Tex2D, width, height, colorFormat, generateMipmap, sRGB);

        let renderTarget = new NativeWebGLInternalRT(this._engine, colorFormat, depthStencilFormat, false, texture.mipmap, multiSamples);
        renderTarget.colorFormat = colorFormat;
        renderTarget.depthStencilFormat = depthStencilFormat;
        renderTarget._textures.push(texture);

        let framebuffer = renderTarget._framebuffer;

        let gl = <WebGLRenderingContext>renderTarget._gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        // color
        let colorAttachment = this.glRenderTargetAttachment(colorFormat);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture.resource, 0);
        // depth
        let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
        if (depthBufferParam) {
            let depthbuffer = this.createRenderbuffer(width, height, depthBufferParam.internalFormat, renderTarget._samples);
            renderTarget._depthbuffer = depthbuffer;
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return renderTarget;
    }

    createRenderTargetCubeInternal(size: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): NativeWebGLInternalRT {
        multiSamples = 1;

        // let texture = this.createRenderTextureInternal(dimension, size, size, colorFormat, gengerateMipmap, sRGB);
        let texture = this.createRenderTextureCubeInternal(TextureDimension.Cube, size, colorFormat, generateMipmap, sRGB);

        let renderTarget = new NativeWebGLInternalRT(this._engine, colorFormat, depthStencilFormat, true, texture.mipmap, multiSamples);

        renderTarget._textures.push(texture);

        let framebuffer = renderTarget._framebuffer;

        let gl = <WebGLRenderingContext>renderTarget._gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
        if (depthBufferParam) {
            let depthbuffer = this.createRenderbuffer(size, size, depthBufferParam.internalFormat, renderTarget._samples);
            renderTarget._depthbuffer = depthbuffer;
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return renderTarget;
    }

    createRenderbuffer(width: number, height: number, internalFormat: number, samples: number) {

        // todo  多个 gl
        let gl = this._gl;

        let renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);

        gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);

        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        return renderbuffer;
    }

    // todo  color 0, 1, 2, 3 ?
    setupRendertargetTextureAttachment(renderTarget: NativeWebGLInternalRT, texture: NativeWebGLInternalTex) {
        let gl = renderTarget._gl;

        renderTarget._depthTexture = texture;

        let depthbuffer = renderTarget._depthbuffer;
        depthbuffer && gl.deleteRenderbuffer(depthbuffer);
        renderTarget._depthbuffer = null;
        let attachment = this.glRenderTargetAttachment(renderTarget.depthStencilFormat);

        let framebuffer = renderTarget._framebuffer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.resource, 0);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // todo 不同 格式
    readRenderTargetPixelData(renderTarget: NativeWebGLInternalRT, xOffset: number, yOffset: number, width: number, height: number, out: ArrayBufferView): ArrayBufferView {

        let gl = renderTarget._gl;

        this.bindRenderTarget(renderTarget);

        let frameState = gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE;

        if (!frameState) {
            this.unbindRenderTarget(renderTarget);
            return null;
        }
        switch (renderTarget.colorFormat) {
            case RenderTargetFormat.R8G8B8:
                gl.readPixels(xOffset, yOffset, width, height, gl.RGB, gl.UNSIGNED_BYTE, out);
                break;
            case RenderTargetFormat.R8G8B8A8:
                gl.readPixels(xOffset, yOffset, width, height, gl.RGBA, gl.UNSIGNED_BYTE, out);
                break;
            case RenderTargetFormat.R16G16B16A16:
                gl.readPixels(xOffset, yOffset, width, height, gl.RGBA, gl.FLOAT, out);
                break;
        }
        this.unbindRenderTarget(renderTarget);

        return out;
    }

    updateVideoTexture(texture: NativeWebGLInternalTex, video: HTMLVideoElement, premultiplyAlpha: boolean, invertY: boolean): void {

        let gl = texture._gl;

        let target = texture.target;
        let internalFormat = texture.internalFormat;
        let format = texture.format;
        let type = texture.type;
        let width = texture.width;
        let height = texture.height;

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        this._engine._bindTexture(texture.target, texture.resource);
        // todo 用 sub 会慢
         gl.texSubImage2D(target, 0, 0, 0, format, type, video);
        //gl.texImage2D(target, 0, internalFormat, format, type, video);

        this._engine._bindTexture(texture.target, null);

        premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    }

}